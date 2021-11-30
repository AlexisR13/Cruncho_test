import H from "@here/maps-api-for-javascript";
import { getIsOpen } from "../utils";


export function Marker(restaurant: any, text: string){
    const [ , color, ] = getIsOpen(restaurant)

    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="12" cy="12" r="12" fill-opacity="50%" '+
    'style="fill: ' +color+ '; stroke: ' +color+ '"/>' +
    '<text x="12" y="18" font-size="12pt" font-family="Arial" ' +
    'text-anchor="middle" fill="white">' + text + '</text>' +
    '</svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup)

    const coords = restaurant.position
    //@ts-ignore
    var marker = new H.map.Marker(coords, {icon: icon});


    return marker
}


export function MarkerHere(lat: number, lng: number){
    const coords = {lat: lat, lng: lng}
    //@ts-ignore
    var marker = new H.map.Marker(coords);

    return marker
}