import React,{Component} from 'react';
import {Text,View,FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem} from 'react-native-elements';
import {MyHeader} from '../component/MyHeader'

export default class HomeScreen extends Component{
   constructor(){
      super();
      this.state={
         userId     : firebase.auth().currentUser.email ,
         allRequests: [], 
      } 
      this.exchangeRef = null
   }
   componentDidMount(){
      this.getExchangeList();
   }
   componentWillUnmount(){
      this.exchangeRef();
   }

   getExchangeList=()=>{
      this.exchangeRef= db.collection("exchange_items")
      .onSnapshot((snapshot)=>{
        var allRequests = snapshot.docs.map(document=>document.data())
        this.setState({
            allRequests: allRequests
        })
      }) 
   }

   keyExtractor=(item,index)=>index.toString();
   renderItem =({item,i})=>{
      console.log(item.item_name);
      return(
         <ListItem
           key={i}
           title={item.item_name}
           subtitle = {item.description}
           titleStyle = {{color: 'black',fontWeight: 'bold'}}
           rightElement={
              <TouchableOpacity
                onPress={()=>{
                   this.props.navigation.navigate("ReceiverDetails",{"details": item})
                }}
              >
                 <Text style={{color: '#ffff'}}>View</Text>
              </TouchableOpacity>
           }
          bottomDivider 
           />
      )
   }

    render(){
      return(
         <View style={{flex: 1}}>
              <MyHeader title="Donate Items" navigation={this.props.navigation}/>
              <View>{this.state.allRequests.length===0?(
                <View style={styles.subContainer}>
                    <Text style={{fontSize: 20}}>List Of All Exchange Items</Text>
                </View>  
              ):(
                 <FlatList
                   keyExtractor={this.keyExtractor}
                   data={this.state.allRequests}
                   renderItem={this.renderItem}
                 /> 
              )
    }</View>               
            </View>
      ) 
   }
}
const styles = StyleSheet.create({ 
   subContainer:{
       flex:1, 
       fontSize: 20, 
       justifyContent:'center', 
       alignItems:'center' },
        button:{ 
           width:100, 
           height:30, 
           justifyContent:'center', 
           alignItems:'center', 
           backgroundColor:"#ff5722", 
           shadowColor: "#000", 
           shadowOffset: { width: 0, height: 8 } 
         }, 
         })
