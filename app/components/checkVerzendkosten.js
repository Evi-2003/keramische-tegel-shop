'use client'
import { addItem } from 'use-shopping-cart'
export default function checkVerzendkosten(){
    addItem({
        name: 'Verzendkosten',
        description: 'Bezorgkosten binnen Nederland',
        id: 'verzendkosten',
        price: 1000,
        currency: 'EUR' 
    })
}