import {useState, FormEvent} from 'react';
import logo from './icons/WhereToEat.png';
import loupe from './icons/loupe.png';
import cutlery from './icons/cutlery.png';
import pin from './icons/pin.png';
import './App.css';
import Map from './components/map';
import { API_KEY } from './env';
import { RestaurantsList } from './components/restaurantsList';
import MapZoom from './components/mapZoom';


function App() {
    const [position, setPosition] = useState({lat: 48.858370, lng: 2.294481})   // Eiffel Tower :)
    const [zoom, setZoom] = useState(16)
    const [restaurants, setRestaurants] = useState([])
    const [clearMap, setClearMap] = useState(false)

    // get current location if possible
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
        });
    }

    // change map position based on the address search
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

    // show closest restaurants
    async function getRestaurants(position: {lat: number, lng: number}){
        const pos = position.lat.toString() +","+ position.lng.toString()
        const url = "https://discover.search.hereapi.com/v1/discover?at=" + pos 
                    + "&q=restaurant&apiKey=" + API_KEY
        setClearMap(true)
        fetch(url).then(data => data.json())
                .then(res => setRestaurants(res.items.slice(0,10)))
                .then(() => setClearMap(false))
    }


    // MAP VIEW FUNCTIONS
    // handle zoom with buttons
    function handleZoomIn(){
        setZoom(zoom*1.05)
    }
    function handleZoomOut(){
        setZoom(zoom*0.95)
    }

    // interactive map
    function handleMapViewChange(zoom: number, lat: number, lng: number) {
        setPosition({lat: lat, lng: lng})
        setZoom(zoom)
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

                    <Map lat={position.lat} lng={position.lng} zoom={zoom}
                        restaurantsList={restaurants}
                        onMapViewChange={handleMapViewChange}
                        clearMap={clearMap}
                        />
                </div>

                {/* Zoom buttons on the map */}
                <MapZoom
                    zoom={zoom}
                    onZoomIn={handleZoomIn}
                    onZoomOut={handleZoomOut}
                />


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
