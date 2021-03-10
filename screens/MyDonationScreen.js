import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    Image, 
    Modal, 
    ScrollView, 
    KeyboardAvoidingView, 
    FlatList, 
    SnapshotViewIOS 
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class MyDonationScreen extends React.Component {

    constructor() {
        super();
        this.state={
            userId : firebase.auth().currentUser.email,
            allDonations : []
        }
        this.requestRef = null
    }

    getAllDonations = () => {
        this.requestRef = db.collection("all_donations").where("donor_id","==",this.state.userId).onSnapshot(
            (snapshot) => {
                var allDonations = snapshot.docs.map(document => document.data())
                this.setState({
                    allDonations : allDonations
                })
            }
        );
        //console.log
    }

    keyExtractor = (item,index) => index.toString()

    renderItem = ({item,i}) => {
        return(
            <ListItem
                key = {i}
                bottomDivider
            >
                <ListItem.Content>
                    <ListItem.Title style = {{ color : 'black', fontWeight : 'bold' }}>
                        {item.book_name}
                    </ListItem.Title>

                    <ListItem.Subtitle style = {{ color : 'green' }}>
                        {"Requested by : " + item.requested_by + '\nstatus : ' + item.request_status}
                    </ListItem.Subtitle>
                    
                    <Icon
                        name = "book"
                        type = "font-awesome"
                        color = "#696969"
                    />

                    <TouchableOpacity style = { styles.button }>
                        <Text style = {{ color : 'white' }}>Send Book</Text>
                    </TouchableOpacity>

                </ListItem.Content>
            </ListItem>
        );
    }

    componentDidMount() {
        this.getAllDonations();
    }

    render() {
        return(
            <View style = {{ flex : 1 }}>
                <View style = {{ flex : 1 }}>

                {this.state.allDonations.length === 0
                    ? (
                        <View>
                            <Text>No books to donate</Text>
                        </View>
                    ) : (
                        <FlatList
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.allDonations}
                            renderItem = {this.renderItem}
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
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation : 16
    },
    subtitle :{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})