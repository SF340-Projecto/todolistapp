import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
    // These are user defined styles

    taskText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#707070',
        backgroundColor: '#FFFFFF',
        padding: 10,
    
      },
      container: {
        paddingTop: 50,
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      logo: {
        width: 66,
        height: 58,
      },
      logoutText: {
        padding: 10,
        fontSize: 24,
        
      },
      logoutContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },  
      logoutButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        backgroundColor: '#25ced1',
        borderRadius: 10,
      },
      body: {
        justifyContent: 'center',
        flexDirection: 'column',
      },
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        // backgroundColor: '#FFFFFF',
      },
      addButtonContainer: {
        // backgroundColor: '#25ced1',
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        marginTop: 25,
      },
      addButtonText: {
        // color: '#707070',
        // fontWeight: 'bold',
        fontSize: 50,
      },
      addButton: {
        // backgroundColor: '#FFFFFF',
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 70,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
      },
      header_container: {
        marginLeft: 25,
      },
      textHeader: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 24,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 75,
      },
      screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      viewWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      modalView: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 400,
        width: width * 0.8,
        backgroundColor: '#fff',
        borderRadius: 7,
      },
      textInput: {
        width: '80%',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        marginBottom: 8,
      },
      selectButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center'
      },
      uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
      },
      imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
      },
      progressBarContainer: {
        marginTop: 20
      },
      imageBox: {
        width: 300,
        height: 300
      },
      bg_modal: {
        backgroundColor: '#000000aa',
        flex: 1
      },
      paper_madal: {
        backgroundColor: '#ffffff',
        margin: 30,
        marginTop: 90,
        marginBottom: 90,
        padding: 20,
        borderRadius: 10,
        flex: 1
      },
      text_normal: {
        fontWeight: 'bold',
        padding: 10,
      },
      input: {
        width: '90%',
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: '#e5f1f1',
        borderRadius: 5,
      },
      input2: {
        width: '90%',
        borderWidth: 1,
        padding: 20,
        fontSize: 16,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: '#e5f1f1',
        borderRadius: 5,
        textAlignVertical: 'top'
      },
      style_flex_button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 200,
        paddingBottom: 10,
        padding: 20
      },
      addButtonL: {
        backgroundColor: '#707070',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 40,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 20,
      },
      addButtonR: {
        backgroundColor: '#25ced1',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 40,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 20,
      },
      addButtonText1: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
      },

});