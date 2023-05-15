import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const TermsOfUse = props => {
    return(
        <View>
            <Text>Terms Of Use</Text>
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
        headerTitle: 'Terms Of Use',
        headerShown: true
    }
}

export default TermsOfUse;