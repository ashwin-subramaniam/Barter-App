import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../component/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyBarterScreen extends Component{
    constructor(){
       super();
       this.state={
        exchangerId        : firebase.auth().currentUser.email,
        exchangerName      : "",
        allBarters         : []
       }
       this.exchangeRef = null; 
    }
    getAllBarters=()=>{
       this.exchangeRef = db.colllection("MyBarters").where("exchanger_id","==",this.state.exchangerId)
       .onSnapShot((snapshot)=>{
          var allBarters = []
          var allBarters = snapshot.docs.map(document => document.data());
           this.setState({
               allBarters: allBarters
           })
       })
    }

    keyExtracter = (item,index) => index.toString();
    
    renderItem =( {item,i} )=>{
        <ListItem
          key={i}
          title={item.item_name}
          subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.exchange_status}        
          leftElement={<Icon  name="item" type="font-awesome" color="#696969"/>}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}

          rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>Exchange</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    }

     componentDidMount(){
       this.getAllBarters();
     }
     componentWillUnmount(){
       this.exchangeRef();
     }

    render(){
        return(
            <View style={{flex:1}}>
            <MyHeader navigation={this.props.navigation} title="My Barters"/>
            <View style={{flex:1}}>
              {
                this.state.allBarters.length === 0
                ?(
                  <View style={styles.subtitle}>
                    <Text style={{ fontSize: 20}}>List of all Item Donations</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allBarters}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
 
    }
}

const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })