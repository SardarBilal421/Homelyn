import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const PrivacyPolicy = props => {
    return(
        <View>
            <Text>Privacy Policy</Text>
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
        headerTitle: 'Privacy Policy',
        headerShown: true
    }
}

export default PrivacyPolicy;