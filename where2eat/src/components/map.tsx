import React, {useState, useEffect} from 'react';
import H from "@here/maps-api-for-javascript";
import { API_KEY } from '../env';
import { Marker, MarkerHere } from './marker';
import { Restaurant } from '../types';


export default function Map(props: {lat: number, lng: number, restaurantsList: Restaurant[]}) {
    // the reference to the container
    const ref = React.createRef();
    // reference to the map
    const [map, setMap] = useState(null);
    
    
    useEffect(() => {
        if (!map) {
        // instantiate a platform, default layers and a map as usual
        const platform = new H.service.Platform({apikey: API_KEY});
        const layers = platform.createDefaultLayers();
        const map = new H.Map(
            //@ts-ignore
            ref.current,
            layers.vector.normal.map,
            {
            pixelRatio: window.devicePixelRatio,
            center: {lat: props.lat, lng: props.lng},
            zoom: 15,
            },
        )
        //@ts-ignore
        setMap(map);
        }
        else {
            //@ts-ignore
            map.removeObjects(map.getObjects ())
            //@ts-ignore
            map.setCenter({lat: props.lat, lng: props.lng})
            // map.setZoom(props.zoom)

            // Add markers to the map:
            const marker = MarkerHere(props.lat, props.lng)
            //@ts-ignore
            map.addObject(marker);
            props.restaurantsList.reverse().forEach((restaurant: Restaurant, index: number) => {
                //@ts-ignore
                map.addObject(Marker(restaurant, (props.restaurantsList.length - index).toString()))
            })             
        }

    }, [map, ref, props.lat, props.lng, props.restaurantsList])


    return (
    <div
        id="Map"
        //@ts-ignore
        ref={ref}
    />
    )
}
