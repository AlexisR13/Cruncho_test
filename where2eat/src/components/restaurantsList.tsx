import './restaurantsList.css'
import phoneIcon from './../icons/call.png'
import distanceIcon from './../icons/distance.png'
import addressIcon from './../icons/address-pin.png'
import clock from './../icons/clock.png'
import plus from './../icons/plus.png'
import minus from './../icons/minus.png'
import { getPhone, getIsOpen } from '../utils';
import { Restaurant } from '../types';
import IconAndText from './iconAndText';


export function RestaurantsList(restaurants: Restaurant[]) {
    return restaurants.map((restaurant: Restaurant, index: number) => {
        const phone = getPhone(restaurant)
        const [isOpen, color, openHours] = getIsOpen(restaurant)

        function formatAddress(address: string){
            // Delete first argument of the address corresponding to the restaurant name
            const L = address.split(',')
            const newAddress = L.slice(1,L.length).join(",")
            return newAddress
        }

        function MoreMinusButton(index: number){
            //@ts-ignore
            var src = document.getElementById("plusButton"+index).firstChild.src
            if (src.includes('plus')){
                //@ts-ignore
                document.getElementById("openingHours"+index).style.display = "block"
                //@ts-ignore
                document.getElementById("plusButton"+index).firstChild.src = minus
            }
            else {
                //@ts-ignore
                document.getElementById("openingHours"+index).style.display = "none"
                //@ts-ignore
                document.getElementById("plusButton"+index).firstChild.src = plus
            }
        }



        return(
            <li className="RestaurantContainer" key={index.toString()}>

                <h2> {index+1} - {restaurant.title} </h2>

                <div className="RestaurantInfo">
                    
                    <div className="IconAndText">
                        {color===""? null :
                        <svg width="20" height="20"xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="8" fill={color}/>
                        </svg>}
                        <p> {isOpen} </p>
                    </div>

                    <IconAndText
                        icon={phoneIcon}
                        text={phone}
                    />
                    <IconAndText
                        icon={distanceIcon}
                        text={restaurant.distance+ " m"}
                    />

                </div>


                <IconAndText
                    icon={addressIcon}
                    text={formatAddress(restaurant.address.label)}
                />

                {openHours && openHours.length>0 &&
                <div>
                    <button className="plusButton" id={"plusButton"+index} onClick={() => MoreMinusButton(index)}>
                        <img src={plus} className="Icon" alt=""/>
                    </button>
                    <div id={"openingHours" + index} style={{display: "none"}}> 
                        <IconAndText
                            icon={clock}
                            text="Opening hours"
                        />
                        {openHours?.map((elt) => {
                            return(<p className="openHours">{elt}</p>)
                        })} 
                    </div>
                </div>
                }


            </li>
        )
    });
}