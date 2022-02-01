import React, { useState, useContext } from 'react';
import { Text, View, Button, Switch, StyleSheet, TouchableOpacity, SafeAreaView, Image, Modal } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { AuthContext } from '../navigation/AuthProviders';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function HomeScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.body}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>MY ACCOUNT</Text>
            </View>
            {/* User Profile */}
            <View style={styles.userProfileBg}>
                <FontAwesome5 name="user-alt" color={'#707070'} size={50} />
                {/* <Image source={require('./img/usertda.png')} style={styles.userLogo}/> */}
            </View>

            <View style={styles.userNameTopContainer}>
                <Text style={styles.userNameTopText}>USER NAME</Text>
            </View>

            {/* SECTION MENU */}
            <View style={styles.menuContainer}>
                {/* Username */}
                <TouchableOpacity style={styles.menuHeader}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>USERNAME</Text>
                        </View>
                        <Text style={styles.menuTextRight}>CHANGE USERNAME</Text>
                    </View>
                </TouchableOpacity>

                {/* Password */}
                <TouchableOpacity style={styles.menuHeader}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>PASSWORD</Text>
                        </View>
                        <Text style={styles.menuTextRight}>CHANGE PASSWORD</Text>
                    </View>
                </TouchableOpacity>

                {/* Email */}
                <TouchableOpacity style={styles.menuHeader}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>EMAIL</Text>
                        </View>
                        <Text style={styles.menuTextRight}>USER.EMAIL@EMAIL.COM</Text>
                    </View>
                </TouchableOpacity>

                {/* Archive */}
                <TouchableOpacity style={styles.menuHeader}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>ARCHIVE</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" color={'#707070'} size={20} />
                    </View>
                </TouchableOpacity>

                {/* Calendar */}
                <TouchableOpacity style={styles.menuHeader}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>CALENDAR</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" color={'#707070'} size={20} />
                    </View>
                </TouchableOpacity>

                {/* Theme */}
                <TouchableOpacity style={styles.menuHeader} onPress={() => navigation.navigate('ThemeScreen')}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>THEME</Text>
                        </View>
                        <Text style={styles.menuTextRight}>LIGHT</Text>
                    </View>
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity style={styles.menuHeaderLogout} onPress={() => logout()}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>LOGOUT</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" color={'#707070'} size={20} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* For Modal */}



            {/* For Modal */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textLeft: {
        flex: 1,
    },
    menuSection: {
        flexDirection: 'row',
    },
    menuText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#707070',
    },
    menuTextRight: {
        fontSize: 14,
        color: '#707070',

    },
    menuHeader: {
        padding: 17,
        backgroundColor: '#E5F1F1',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: "#707070",
    },
    menuHeaderLogout: {
        padding: 17,
        backgroundColor: '#E5F1F1',
        width: '100%',
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
        width: '100%',
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerContainer: {
        height: 75,
        backgroundColor: '#25ced1',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 24,
    },
    userProfileBg: {
        marginTop: 20,
        backgroundColor: '#E5F1F1',
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
    },
    userLogo: {
        width: 60,
        height: 60,
    },
    userNameTopContainer: {
        margin: 20,
    },
    userNameTopText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
