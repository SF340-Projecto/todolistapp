import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
    // These are user defined styles

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
        marginTop: 50,
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
    profile_icon:{
        fontSize:50
    },
    icon_menu:{
        fontSize:20
    }

});