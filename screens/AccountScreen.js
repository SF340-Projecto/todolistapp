import React, {useContext} from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { logout } from '../redux/actions/authActions';
import styles from '../css/AccountScreen';
import themeContext from '../config/themeContext';
import { useSelector, useDispatch } from 'react-redux';

export default function HomeScreen({ navigation }) { 

    const dispatch = useDispatch();
    const dataApi = useSelector(state => state.data.user)
    const theme = useContext(themeContext);
    const logoutAuth = () => {
        dispatch(logout())
      }

    return (
        <SafeAreaView style={[styles.body,{backgroundColor: theme.bg_body}]}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>MY ACCOUNT</Text>
            </View>
            {/* User Profile */}
            <View style={[styles.userProfileBg,{backgroundColor: theme.userProfileBg}]}>
                <FontAwesome5 name="user-alt" style={[styles.profile_icon,{color: theme.icon_profile}]} />
                {/* <Image source={require('./img/usertda.png')} style={styles.userLogo}/> */}
            </View>

            <View style={styles.userNameTopContainer}>
                <Text style={[styles.userNameTopText,{color: theme.fontColor}]}>{dataApi[0]['first_name']}</Text>
            </View>

            {/* SECTION MENU */}
            <View style={styles.menuContainer}>
                {/* Username */}
                <TouchableOpacity style={[styles.menuHeader,{backgroundColor: theme.bg_menu}]}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={[styles.menuText,{color: theme.fontColor}]}>USERNAME</Text>
                        </View>
                        <Text style={[styles.menuTextRight,{color: theme.fontColor}]}>{dataApi[0]['first_name']}</Text>
                    </View>
                </TouchableOpacity>

                {/* Password */}
                <TouchableOpacity style={[styles.menuHeader,{backgroundColor: theme.bg_menu}]}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={[styles.menuText,{color: theme.fontColor}]}>PASSWORD</Text>
                        </View>
                        <Text style={[styles.menuTextRight,{color: theme.fontColor}]}>CHANGE PASSWORD</Text>
                    </View>
                </TouchableOpacity>

                {/* Email */}
                <TouchableOpacity style={[styles.menuHeader,{backgroundColor: theme.bg_menu}]}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={[styles.menuText,{color: theme.fontColor}]}>EMAIL</Text>
                        </View>
                        <Text style={[styles.menuTextRight,{color: theme.fontColor}]}>{dataApi[0]['email']}</Text>
                    </View>
                </TouchableOpacity>

                {/* Archive */}
                <TouchableOpacity style={[styles.menuHeader,{backgroundColor: theme.bg_menu}]} onPress={() => navigation.navigate('ArchiveTask')}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={[styles.menuText,{color: theme.fontColor}]}>ARCHIVE</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" style={[styles.icon_menu,{color: theme.fontColor}]} />
                    </View>
                </TouchableOpacity>

                {/* Calendar */}
                <TouchableOpacity style={[styles.menuHeader,{backgroundColor: theme.bg_menu}]}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={[styles.menuText,{color: theme.fontColor}]}>TEMPLATE</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" style={[styles.icon_menu,{color: theme.fontColor}]} />
                    </View>
                </TouchableOpacity>

                {/* Theme */}
                <TouchableOpacity style={[styles.menuHeader,{backgroundColor: theme.bg_menu}]} onPress={() => navigation.navigate('ThemeScreen')}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={[styles.menuText,{color: theme.fontColor}]}>THEME</Text>
                        </View>
                        <Text style={[styles.menuTextRight,{color: theme.fontColor}]}>LIGHT</Text>
                    </View>
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity style={[styles.menuHeader,{backgroundColor: theme.bg_menu}]} onPress={() => logoutAuth()}>
                    <View style={styles.menuSection}>
                        <View style={styles.textLeft}>
                            <Text style={[styles.menuText,{color: theme.fontColor}]}>LOGOUT</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" style={[styles.icon_menu,{color: theme.fontColor}]} />
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
