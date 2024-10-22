import { Photo } from "./Photo"

export interface Rooms {
    roomID?: number
    roomTitle: string
    roomAddress: string
    roomOwner: string
    roomDescribtion: string
    city: string
    country: string
    price: number
    rating: number
    roomType: number
    isActive?: boolean
    photo?: Photo[]
}