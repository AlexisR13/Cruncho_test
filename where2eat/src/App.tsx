import {useState, FormEvent} from 'react';
import logo from './icons/WhereToEat.png';
import loupe from './icons/loupe.png';
import cutlery from './icons/cutlery.png';
import pin from './icons/pin.png';
import './App.css';
import Map from './components/map';
import { API_KEY } from './env';
import { RestaurantsList } from './components/restaurantsList';


function App() {
    const [position, setPosition] = useState({lat: 48.856614, lng: 2.3522219})
    const [restaurants, setRestaurants] = useState([])

    getCurrentLocation()
    function getCurrentLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position: any) => {
            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
          });
        }
    }

    async function getPositionFromSearch(e: FormEvent){
        e.preventDefault()
        //@ts-ignore
        const search = document.getElementById("SearchBar").value
        const searchInUrl = search.split(/[\s,]+/).join('+')
        const url = "https://geocode.search.hereapi.com/v1/geocode?q=" + searchInUrl 
                    + "&apiKey=" + API_KEY
        fetch(url).then(data => data.json())
                .then(res => res.items[0].position)
                .then(pos => {setPosition(pos);
                              getRestaurants(pos);})
    }

    async function getRestaurants(position: {lat: number, lng: number}){
        const pos = position.lat.toString() +","+ position.lng.toString()
        const url = "https://discover.search.hereapi.com/v1/discover?at=" + pos 
                    + "&q=restaurant&apiKey=" + API_KEY
        fetch(url).then(data => data.json())
                .then(res => setRestaurants(res.items.slice(0,10)))
    }



    return (
        <div id="App">
            <header id="Header">
                <img src={logo} id="Logo" alt="logo" />
                <p> WhereToEat?</p>
            </header>

            <div id="Body">

                {/* Left half screen */}
                <div style={{width: "60%"}}>
                    <div className="TextAndIcon">
                        <img src={pin} className="Icon" alt=""/>
                        <h2> Where are you hungry from? </h2>
                    </div>

                    <form onSubmit={(e) => getPositionFromSearch(e)} className="TextAndIcon">
                        <input
                            type="text"
                            id="SearchBar"
                            placeholder="Address, city"
                            />
                        <button type="submit" id='SearchButton'>
                            <img src={loupe} style={{height: "100%"}} alt=""/>
                        </button>
                    </form>

                    <Map lat={position.lat} lng={position.lng} 
                        restaurantsList={restaurants}
                        />
                </div>

                {/* Right half screen */}
                { restaurants.length>0 ?
                <nav style={{width: "40%"}}>
                    <div className="TextAndIcon">
                        <img src={cutlery} className="Icon" alt=""/>
                        <h2>The 10 closest restaurants around you :</h2>
                    </div>
                    <ul id="ListContainer">
                        {RestaurantsList(restaurants)}
                    </ul>
                </nav>
                : 
                <button id="getRestaurantButton" onClick={() => getRestaurants(position)}>
                    Show me where to go around here!
                </button>
                }

            </div>
        </div>
    );
}

export default App;
