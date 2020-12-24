import { Dispatch } from "redux";
import { FoodAvailability } from "../models";
import axios from 'axios'
import { BASE_URL } from "../../utils";

export interface AvailabilityAction{
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}
export interface ShoppingErrorAction{
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}

export type ShoppingAction = AvailabilityAction | ShoppingErrorAction

export const onAvailability = (postCode: string) => {
    return async (dispatch: Dispatch<ShoppingAction>) => {
        try{
            const response = await axios.get(`${BASE_URL}/food/availability/${postCode}`)
            console.log(response)
            if(!response){
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                })
            }
        }catch(err){
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: Error
            })

        }
    }
}