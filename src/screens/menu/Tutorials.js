import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Tutorials = props => {
    return(
        <View>
            <Text>Tutorials</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center', justifyContent:'center'
    }
})
export const screenOptions = navData => {
    return {
        headerTitle: 'Tutorials',
        headerShown: true
    }
}

export default Tutorials;