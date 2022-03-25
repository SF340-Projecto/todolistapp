import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
    // These are user defined styles

    addButtonIcon: {
        marginHorizontal: 5,
        marginVertical:-10,
        marginTop:-3,
    
        
       
      },
      buttonContainerIcon: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'flex-end',
        paddingBottom:20,
        paddingRight:10
    
    
      },
      body: {
        flex: 1,
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor:'#FFFFFF'
      },
      header: {
        height: 75,
        backgroundColor: '#25ced1',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:20
      },
      headerText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 24,
      },
      taskContainer: {
        backgroundColor: '#FFFFFF',
        paddingTop:1
    
      },
      taskText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15,
        marginTop:-8,
      },
      buttoncircle:{
        size:30,
        color:'#707070',
        paddingLeft:10
      },
      contentline:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:20
      }

});