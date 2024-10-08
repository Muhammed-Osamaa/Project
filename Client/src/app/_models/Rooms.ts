import { Photo } from "./Photo"

export interface Rooms {
    roomID: number
    roomDescribtion: string
    roomTitle: string
    roomAddress: string
    roomOwner: string
    city: string
    country: string
    price: number
    rating: number
    roomType: number
    isActive: boolean
    photo: Photo[]
}