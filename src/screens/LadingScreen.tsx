import React, { useEffect, useState } from 'react' 
import { View, Text, StyleSheet, Image, TouchableOpacityBase, Dimensions } from 'react-native';
import * as Location from 'expo-location'
import { useNavigation } from '../utils'

import { ApplicationState, UserState, onUpdateLocation } from '../redux'
import { connect } from 'react-redux'
import { UserReducer } from '../redux/reducers/useReducer';

interface LandingScreenProps {
    userReducer: UserState,
    onUpdateLocation: Function
}
const screenWidth = Dimensions.get('screen').width

export const _LandingScreen: React.FC<LandingScreenProps> = (props) =>{
    const { userReducer, onUpdateLocation } = props
    const { navigate } = useNavigation();

    const [ errorMsg, setErrorMsg ] = useState("")
    const [ address, setAddress ] = useState<Location.LocationGeocodedAddress>()
    const [ displayAddress, setDisplayAddress ] = useState("Waiting for Current Location")

    useEffect(() => {
        (async() => {
            let { status } = await Location.requestPermissionsAsync();

            if(status !== 'granted'){
                setErrorMsg('Permission to access location is not granted')
            }
            let location: any = await Location.getCurrentPositionAsync({});

            const { coords } = location

            if(coords){
                const { latitude, longitude } = coords;
                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude })
                for(let item of addressResponse){
                    //setAddress(item)
                    // onUpdateLocation(address)
                    let currentAddress = `${item.name}.${item.street}.${item.postalCode}.${item.country}`
                    setDisplayAddress(currentAddress)

                    if(currentAddress.length > 0){
                        setTimeout(() => {
                            navigate('homeStack')
                        },3000)
                    }
                    return;
                }
            }else{

            }
        })()
    }, [])
        return (
            <View style={style.container}>
                <View style={style.navigation} />
                <View style={style.body}>
                <Image source={require('../images/delivery_icon.png')} style={style.deliveryIcon} />
                <View style={style.addressContainer}>
                 <Text style={style.addressTitle}>Landing Screen</Text>
                </View>   
                <Text style={style.addressText}>{displayAddress}</Text>                 
                </View>
                <View style={style.footer}>
                    <Text></Text>
                </View>
            </View>
        );
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    navigation: {
        flex: 2
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        width: screenWidth -100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    addressTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#707070'
    },
    addressText: {
        fontSize: 20,
        fontWeight: '200',
        color: '#4f4f4f'
    },
    footer: {
        flex: 1
    },
    deliveryIcon: {
        width: 120,
        height: 120
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
})

const LandingScreen = connect(mapToStateProps, { onUpdateLocation })( _LandingScreen ) 

export { LandingScreen }