import React,{Component} from 'react';
import {Text,View,KeyboardAvoidingView,TextInput, Alert,StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MyHeader} from '../component/MyHeader'

export default class ExchangeScreen extends Component{
    constructor(){
      super();
      this.state={
        userName: firebase.auth().currentUser.email,
        itemName: '',
        description: ''  
      }  
    }
    addItem=(itemName,description)=>{
       var userName = this.state.userName
       var randomExchangeId = this.createUniqueId() 
       db.collection("exchange_requests").add({
           "username"    : userName,
           "item_name"   : itemName,
           "description" : description,
           "request_id"  : randomExchangeId,
           "Date"        : firebase.firestore.FieldValue.serverTimestamp()
        })
       this.setState({
           itemName: '',
           description: ''
       })
       return Alert.alert(
           'Item Ready To Exchange',
           '',
           {text: 'OK',onPress: ()=>{
             this.props.navigation.navigate('HomeScreen')
           }
        }
       )
    }
    createUniqueId=()=>{
        return Math.random().toString(36).substring(7);
    }
    render(){
        return(
            <View style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.keyboardStyle}>
                <TextInput
                 style={styles.formTextImput}
                 placeholder={' Item Name....'}
                 onChangeText={(text)=>{
                     this.setState({
                        itemName: text
                     })
                 }}
                 value={this.state.itemName}
                />
                <TextInput
                 style={styles.formTextImput}
                 placeholder={'Description'}
                 multiline={true}
                 numberOfLines={8}
                 onChangeText={(text)=>{
                     this.setState({
                         description: text  
                     })
                 }}
                 value={this.state.description}
                />
                <TouchableOpacity style={[styles.button],{marginTop: 10}}
                  onPress ={()=>{this.addItem(this.state.itemName,this.state.description)}}
                >
                    <Text>Add Item</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
        )
    }
}
const styles = StyleSheet.create({
   keyBoardStyle:{
      flex:1, 
      alignItems:'center', 
      justifyContent:'center'
     },
   formTextInput:{
      width:"75%", 
      height:35, 
      alignSelf:'center', 
      borderColor:'#ffab91', 
      borderRadius:10, 
      borderWidth:1, 
      marginTop:20, 
      padding:10 
    },
   button:{
      width:"75%", 
      height:50, 
      justifyContent:'center', 
      alignItems:'center', 
      borderRadius:10, 
      backgroundColor:"#ff5722", 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 8, },
      shadowOpacity: 0.44, 
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20 },
     })