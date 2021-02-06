import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';


export default class UserDetailsScreen extends React.Component{
   constructor(props){
     super(props);
     this.state={
       userId                  : firebase.auth().currentUser.email,
       receiverId              : this.props.navigation.getParam('details')["user_id"],
       request_id              : this.props.navigation.getParam('details')["request_id"]  ,  
       itemName                : this.props.navigation.getParam('details')["item_name"],
       reason_for_requesting   : this.props.navigation.getParam('details')["reason_to_request"],
       receiverName            : '',
       receiverContact         : '',
       receiver_address        : '',
       receiverRequestDocId    : ''
     }
   }

   addBarters=()=>{
     db.collection('MyBarters').add({
       "item_name": this.state.itemName,
       "request_id": this.state.requestId,
       "requested_by": this.state.exchangerName,
       "contact": this.state.exchangerContact,
       "exchanger_address": this.state.exchanger_address,
       "exchange_status": this.state.exchangeStatus
     })
   }
   render(){
      return(
          <View style={styles.container}>
            <View style={{flex:0.3}}>
            <Card
                title={"Item Information"}
                titleStyle= {{fontSize : 20}}
              >
              <Card >
                <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
              </Card>
            </Card>
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Exchanger Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.exchangerName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.exchangerContact}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Address: {this.state.exchanger_address}</Text>
              </Card>
            </Card>
          </View>
             <View style={styles.buttonContainer}>
               {
                 this.state.exchangerId!==this.state.userId
                 ?(
                   <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.addBarters();
                      this.props.navigation.navigate('MyBarterScreen')
                    }}
                   >
                     <Text>Exchange</Text>
                   </TouchableOpacity>
                  ):null
               }
             </View>          
          </View>
      )

    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})