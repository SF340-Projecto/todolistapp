import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export default StyleSheet.create({
    
    notiShowTaskContainer: {
        width: '100%',
        height: 30,
        backgroundColor: '#E5F1F1',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 10,
        flexDirection: 'row',
      },
      taskdetailShowContainer: {
        margin: 12,
        marginVertical: 20,
      },
      textdetailShowTask: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 15,
      },
      headerShowTaskContainer: {
        flex: 1,
      },
      textShowTask: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
      },
      showDetailTaskBody: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'flex-start',
      },

      addButtonIcon: {
        marginHorizontal: 7,
        padding: 5,
        borderRadius: 10,
      },
      buttonContainerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
      },
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
        borderWidth: 1,
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
        width: 30,
        height: 30,
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
        backgroundColor: 'tomato',
        borderRadius: 10,
      },
      body: {
        justifyContent: 'center',
        flexDirection: 'column',
      },
      container: {
        flex: 1,
        justifyContent: 'flex-start',
      },
      addButtonContainer: {//-------------------------------------------
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        marginTop: 25,
      },
      addButtonText: {
        fontSize: 40,
        color:'white'
      },
      addButtonText_cat: {
        fontSize: 20,
        color:'white'
      },
      addButton: {
        // backgroundColor: '#FFFFFF',
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 70,
        shadowColor: '#000000',
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
        transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
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
        justifyContent: 'center',
      },
      uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      imageContainer: {
        marginTop: 30,
        alignItems: 'center',
      },
      progressBarContainer: {
        marginTop: 20,
      },
      imageBox: {
        width: 300,
        height: 300,
      },
    
      bg_modal: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1,
      },
      paper_madal: {
        margin: 30,
        marginTop: 90,
        marginBottom: 90,
        padding: 20,
        borderRadius: 10,
        flex: 1,
        borderRadius: 15,
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
        shadowColor: '#000000',
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
        shadowColor: '#000000',
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: '#e5f1f1',
        borderRadius: 5,
        textAlignVertical: 'top',
      },
      style_text_date: {
        fontSize: 16,
        alignItems: 'center',
        paddingTop: 4,
        paddingLeft: 20,
      },
      input_f: {
        width: '90%',
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        shadowColor: '#000000',
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: '#e5f1f1',
        borderRadius: 5,
        flexDirection: 'row',
      },
      logoPic: {
        width: 230,
        height: 200,
        resizeMode: 'stretch',
        marginTop:10,
        borderRadius:20
      },
      addButtonL: {
        backgroundColor: '#707070',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 40,
        shadowColor: '#000000',
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,

      },
      addButtonR: {
        backgroundColor: '#25ced1',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 40,
        shadowColor: '#000000',
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 10,
      },
      style_flex_button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 1,
        paddingBottom: 10,
        padding: 20,
      },
      style_flex:{
        flexDirection:'row',
        alignItems:'center'
      },
      addButtonText1: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
      },
      priority:{
        flexDirection:'row',
        paddingTop:10
 
      },
      priority_select:{
        paddingLeft:50,
        height:10,
        width:300,
        marginVertical: -7,   
        
      },
      closeDetailContainer: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10
      },
      loginButtonText:{
        color:'white',
        backgroundColor:'#25CED1',
        marginVertical:5,
        paddingHorizontal:10,
        paddingVertical:15,
        borderRadius:15,
        fontSize:16, 
        fontWeight: 'bold',
      },



});