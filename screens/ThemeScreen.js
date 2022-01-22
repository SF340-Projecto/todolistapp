import React, {useState , useContext} from "react";
import {
    Text,
    View,
    Button,
    Switch,
    StyleSheet,
  } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../config/themeContext";


export default function HomeScreen(){
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);
    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <Text style={[styles.text, {color: theme.color}]}>Welcome to ThemeScreen</Text>
            <Switch 
            value={mode} 
            onValueChange={(value) => {
                setMode(value);
                EventRegister.emit("changeTheme", value);
            }} />
        </View>
        // Test

    );
}

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
  
    button: {
        paddingTop: 20,
    },

  });