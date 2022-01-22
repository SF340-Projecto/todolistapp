import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {useContext, useEffect} from 'react';
import {
  Button, SafeAreaView, StyleSheet, Modal,
  View, TextInput, Dimensions, Text, TouchableOpacity,   Alert
} from "react-native";
import themeContext from '../config/themeContext';





const Categorie = () => {
    const theme = useContext(themeContext);

    return (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
            <Text style={[styles.text, {color: theme.fontColor}]}>Categorie Screen</Text>
        </View>
    )
}
  

// These are user defined styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        fontWeight: "bold",
        fontSize: 20,
        paddingBottom: 20,
    },


  
});

export default Categorie;