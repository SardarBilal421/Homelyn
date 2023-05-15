import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Settings = props => {
    return(
        <View>
            <Text>Settings</Text>
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
        headerTitle: 'Settings',
        headerShown: true
    }
}

export default Settings;