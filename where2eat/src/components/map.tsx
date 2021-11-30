//@ts-nocheck
import React, {useState, useEffect} from 'react';
import H from "@here/maps-api-for-javascript";
import { API_KEY } from '../env';
import { Marker, MarkerHere } from './marker';
import { Restaurant } from '../types';


export default function Map(
    props: {lat: number, lng: number, zoom: number, 
            restaurantsList: Restaurant[], 
            onMapViewChange: Function,
            clearMap: boolean}
    ) {
    // the reference to the container
    const ref = React.createRef();
    // reference to the map
    const [map, setMap] = useState(null);


    // handle interactive map
    function handleMapViewChange(ev: any) {
        if (ev.newValue && ev.newValue.lookAt) {
          const lookAt = ev.newValue.lookAt;
          // adjust precision
          const lat = Math.trunc(lookAt.position.lat * 1E7) / 1E7;
          const lng = Math.trunc(lookAt.position.lng * 1E7) / 1E7;
          const zoom = Math.trunc(lookAt.zoom * 1E2) / 1E2;
          props.onMapViewChange(zoom, lat, lng);
        }
    }


    
    useEffect(() => {
        if (!map) {
        // instantiate a platform, default layers and a map as usual
        const platform = new H.service.Platform({apikey: API_KEY});
        const layers = platform.createDefaultLayers();
        const map = new H.Map(
            ref.current,
            layers.vector.normal.map,
            {
            pixelRatio: window.devicePixelRatio,
            center: {lat: props.lat, lng: props.lng},
            zoom: props.zoom,
            },
        )

        // attach the listener
        map.addEventListener('mapviewchange', handleMapViewChange);
        // add the interactive behaviour to the map
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        setMap(map);
        }
        else {           
            map.setCenter({lat: props.lat, lng: props.lng})
            map.setZoom(props.zoom)

            if (props.clearMap) {
                map.removeObjects(map.getObjects ())

                // add marker on the user position:
                const marker = MarkerHere(props.lat, props.lng)
                map.addObject(marker);

                // add restaurants'markers
                props.restaurantsList.reverse().forEach((restaurant: Restaurant, index: number) => {
                    map.addObject(Marker(restaurant, index.toString()))
                })
            }       
        }

    }, [map, ref, props.lat, props.lng, props.restaurantsList])


    return (
    <div
        id="Map"
        ref={ref}
    />
    )
}
