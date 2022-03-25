import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { logout } from '../redux/actions/authActions';
import styles from '../css/AccountScreen';

import { useSelector, useDispatch } from 'react-redux';

export default function HomeScreen({ navigation }) {

    const dispatch = useDispatch();
    const dataApi = useSelector(state => state.data.user)
    
    const logoutAuth = () => {
        dispatch(logout())
      }

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
                <Text style={styles.userNameTopText}>{dataApi[0]['first_name']}</Text>
            </View>

            {/* SECTION MENU */}
            <View style={styles.menuContainer}>
                {/* Username */}
                <TouchableOpacity style={styles.menuHeader}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>USERNAME</Text>
                        </View>
                        <Text style={styles.menuTextRight}>{dataApi[0]['first_name']}</Text>
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
                        <Text style={styles.menuTextRight}>{dataApi[0]['email']}</Text>
                    </View>
                </TouchableOpacity>

                {/* Archive */}
                <TouchableOpacity style={styles.menuHeader} onPress={() => navigation.navigate('ArchiveTask')}>
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
                            <Text style={styles.menuText}>TEMPLATE</Text>
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
                <TouchableOpacity style={styles.menuHeaderLogout} onPress={() => logoutAuth()}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={styles.menuText}>LOGOUT</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" color={'#707070'} size={20} />
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
