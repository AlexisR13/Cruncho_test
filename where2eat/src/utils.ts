import { Restaurant } from "./types"


export function getPhone(restaurant: Restaurant){
    var phone = "Ø"
    if (restaurant.contacts && restaurant.contacts[0].phone){
        phone = restaurant.contacts[0].phone[0].value
    }
    return phone
}


export function getIsOpen(restaurant: Restaurant): [null|string, string, null|string[]]{
    var isOpen = null
    var color = ""
    var openHours = null
    if (restaurant.openingHours){
        if (restaurant.openingHours[0].isOpen){
            isOpen = "Open"
            color = "green"
        } else {
            isOpen = 'Closed'
            color = "red"
        }
        openHours = restaurant.openingHours[0].text
    }
    return ([isOpen, color, openHours])
}