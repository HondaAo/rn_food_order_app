import { LocationGeocodedAddress } from 'expo-location'

export interface Category{
    title: String,
    icon: String
}
export interface FoodModel{
    _id: string,
    name: string,
    description: string,
    category: string,
    price: number,
    readyTime: number,
    image: [string]
}

export interface Restaturant{
    _id: string,
    name: string,
    foodType: string,
    phone: string,
    image: string,
    foods: [FoodModel]
}

export interface FoodAvailability{
    categories: [Category],
    restaurant: [Restaturant],
    foods: [FoodModel] 
}

export interface UserModel{
    firstName: string,
    lastName: string,
    contactNumber: string,
    token: string
}

export interface UserState{
    user: UserModel,
    location: LocationGeocodedAddress,
    error: string | undefined
}

export interface ShoppingState{
    availability: FoodAvailability,
}