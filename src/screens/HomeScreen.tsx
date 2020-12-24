import React, { useEffect } from 'react' 
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, ShoppingAction, UserState, onAvailability, ShoppingState } from '../redux';
import { UserReducer } from '../redux/reducers/useReducer';

interface HomeProps {
    userReducer: UserState
    shoppingReducer: ShoppingState
    onAvailability: Function
}

export const _HomeScreen: React.FC<HomeProps> = (props) =>{

    const { location } = props.userReducer
    const { availability } = props.shoppingReducer

    const { categories , foods, restaurant } = availability
    useEffect(() => {
        props.onAvailability(location.postalCode)
    },[location])
        return (
        <View style={style.container}>
            <View style={style.navigation}>
                <View style={{ marginTop: 50, flex: 4, backgroundColor: 'white', paddingLeft: 20, paddingRight: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                 <Text>{location.name !== undefined && `${location.name}${location.street}${location.city}`}</Text>
                 <Text>Edit</Text>
                </View> 
                <View style={{ flex: 8, backgroundColor: 'green', }}>
                    <Text></Text>
                </View>       
            </View>
            <View style={style.body}>
            <Text >Landing Screen</Text>                    
            </View>
            <View style={style.footer}>
                <Text>Footer</Text>
            </View>
        </View>
        );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,31)'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability })( _HomeScreen )

export { HomeScreen }