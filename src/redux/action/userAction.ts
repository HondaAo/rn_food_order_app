import { LocationGeocodedAddress } from 'expo-location'
import AsyncStorage  from '@react-native-community/async-storage';
import { Dispatch } from 'redux';
export interface UpdateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION',
    payload: LocationGeocodedAddress
}

export interface UserErrorAction{
    readonly type: 'ON_USER_ERROR',
    payload: any
}

export type UserAction = UpdateLocationAction | UserErrorAction;

export const onUpdateLocation = (location: LocationGeocodedAddress) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user_location', locationString)
            console.log(locationString)
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })

        }catch(err){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: Error
            })

        }
    }
}

