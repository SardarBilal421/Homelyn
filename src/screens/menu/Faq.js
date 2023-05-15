import React from "react";
import {View, Text, StyleSheet} from 'react-native';

const Faq = props => {
    return(
        <View>
            <Text>Faq</Text>
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
        headerTitle: 'Faq',
        headerShown: true
    }
}

export default Faq;