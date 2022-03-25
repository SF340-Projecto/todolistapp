import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
    // These are user defined styles
    button_wrapper: {
        flexDirection: 'row',
      },
      inputText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 27,
      },
      bgInput: {
        backgroundColor: '#25ced1',
        height: 430,
        width: 310,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
      },
      title: {
        color: '#25ced1',
        textAlign: 'center',
        fontSize: 35,
        width: 320,
        marginBottom: 30,
        fontWeight: 'bold',
    
      },
      input: {
        marginVertical: 7,
        width: 260,
        fontSize: 16,
        padding: 5,
        marginBottom: 7,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingLeft: 15,
      },
      loginButton: {
        marginHorizontal: 14,
        marginVertical: 20,
        backgroundColor: '#fff',
        width: 110,
        height: 40,
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
      },
    
      loginButtonText: {
        textAlign: 'center',
        color: '#25ced1',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 6,
      },
    
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 90,
      },
    
      text: {
        color: '#00CABA',
        fontSize: 18,
        textAlign: 'center',
      },

});