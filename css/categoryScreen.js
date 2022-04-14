import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
    // These are user defined styles

    itemInvisible: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      elevation: 0,
    },  
    row: {
  
      justifyContent: 'space-around'
    },
    body: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
    },
    header: {
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
    categorieContainer: {
      elevation: 5,
      padding: 10,
      backgroundColor: '#FFFFFF',
      width: 150,
      height: 130,
      margin: 20,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 10,
      borderColor: '#25ced1'
    },
    categorieText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'orange'
    },

});