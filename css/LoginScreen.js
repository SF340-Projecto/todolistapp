import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
    // These are user defined styles

    inputText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 27,
      },
      bgInput: {
        backgroundColor: '#25ced1',
        height: 270,
        width: 310,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
      },
      logo: {
        width: 150,
        height: 150,
        resizeMode: 'stretch',
        marginBottom: 25,
      },
    
      title: {
        color: '#00CABA',
        textAlign: 'left',
        fontSize: 35,
        width: 320,
        marginBottom: 1,
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
        marginVertical: 20,
        backgroundColor: '#fff',
        width: 125,
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
        backgroundColor: '#E2FCFA',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
      },
    
      text: {
        marginVertical: 25,
        color: '#707070',
        fontSize: 15,
      },

});