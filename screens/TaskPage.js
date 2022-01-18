import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input } from 'react-native-elements';

// Collect data from firestrore
let arrayDictStudents = [];

// Get url for file


class AddTask extends React.Component {


  constructor(props) {

    // Data wait for user input
    super(props);
    this.state = {
      students: arrayDictStudents,
      userArr: [],
      topic: '',
      taskDetail: '',
    };
  }



// get input from user send it to state
inputValueUpdate = (val, prop) => {
  const state = this.state;
  state[prop] = val;
  this.setState(state);
};


//////////////////// Upload file ///////////////////////////////

FileUpload = (props) => {

  return (
    <View >

        <ScrollView>
          <View style={styles.profile}>
            <Text style={styles.title}>Add Task</Text>
          </View>

          <View style={{ alignItems: 'center'}}>
          <View style={styles.item2}>
          <Input
            placeholder="Topic"
            value={this.state.Name}
            onChangeText={(val) => this.inputValueUpdate(val, 'topic')}
          />

          <Input
            placeholder="Detail Task"
            value={this.state.Topic}
            onChangeText={(val) => this.inputValueUpdate(val, 'taskDetail')}
          />

          </View>
          </View>
          <TouchableOpacity style={styles.photoButton} transparent >
            <Text style={styles.photoButtonText}>
              Upload
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}
            onPress={() => {
                console.log(this.state.topic)
                console.log(this.state.taskDetail)

                this.usersCollectionRef
                  .add({
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    topic: this.state.topic,
                    taskDetail: this.state.taskDetail
                  })
                  .then((res) => {
                    this.setState({
                      topic: '',
                      taskDetail: '',
                    });
                    arrayDictStudents = [];
                  })
                  .catch((err) => {
                    console.log('Error found: ', err);
                    this.setState({
                      isLoading: false,
                    });
                  });
              
            }}>
            <Text style={styles.loginButtonText}>Confirm</Text>
          </TouchableOpacity>
        </ScrollView>
    </View>
  );
};

render() {

  // get col name form firestore //
  this.usersCollectionRef = firestore().collection("TestAddTask");


  return (
    <ScrollView >
      <View>{this.FileUpload()}</View>
    </ScrollView>
  );
}
}

//UI PART

const styles = StyleSheet.create({
  item2: {
    width: '95%',
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F2F3F4'
  },
  title: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 35,
    width: 320,
    marginBottom: 1,
    fontWeight: 'bold',
  },
  profile: {
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 5,
    alignItems: "center",
    backgroundColor: '#fbd',
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
  },

  loginButton: {
    backgroundColor: '#FF341E',
    width: 130,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  },

  loginButtonText: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
    color: '#F0FFFF',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
  },
  photoButton: {
    backgroundColor: '#D0D3D4',
    height: 35,
    width:160,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    padding: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  photoButtonText: {
    textAlign: 'center',
    color: '#424949',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AddTask;