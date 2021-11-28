import './restaurantContainer.css'
import phoneIcon from './../images/call.png'
import distanceIcon from './../images/distance.png'
import { getPhone, getIsOpen } from '../utils';


export function RestaurantsList(restaurants: any) {
    return restaurants.map((restaurant: any, index: number) => {
        const phone = getPhone(restaurant)
        const [isOpen, color, openHours] = getIsOpen(restaurant)

        return(
            <li className="RestaurantContainer">
                <h2> {index+1} - {restaurant.title} </h2>
                <div className="RestaurantInfo">
                    <div className="IconAndText">
                        {color===""? null :
                        <svg width="20" height="20"xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="8" fill={color}/>
                        </svg>}
                        <p> {isOpen} </p>
                    </div>
                    {/* <p> {openHours} </p> */}

                    <div className="IconAndText">
                        <img src={phoneIcon} className="Icon"/>
                        <p> {phone} </p>
                    </div>
                    
                    <div className="IconAndText">
                        <img src={distanceIcon} className="Icon" style={{height: "20px"}}/>
                        <p> {restaurant.distance} m</p>
                    </div>
                </div>
            </li>
        )
    });
}