import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/map';
import { API_KEY } from './env';
import { RestaurantsList } from './components/restaurantContainer';


function App() {
    const [search, setSearch] = useState("")
    const [position, setPosition] = useState({lat: 48, lng: 0})
    const [restaurants, setRestaurants] = useState([])

    async function getPosition(search: string){
        const searchInUrl = search.split(' ').join('+')
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
                <img src={logo} className="Logo" alt="logo" />
                <p> WhereToEat</p>
            </header>
            <div id="Body">
                <div style={{width: "60%"}}>
                    <p> Where are you ? </p>
                    <input
                        type="text"
                        id="SearchBar"
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    <button onClick={() => getPosition(search)}> Search </button>
                    <Map lat={position.lat} lng={position.lng} 
                        restaurantsList={restaurants}
                        />
                </div>
                <nav style={{width: "40%"}}>
                    <ul id="ListContainer">
                        {RestaurantsList(restaurants)}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default App;
