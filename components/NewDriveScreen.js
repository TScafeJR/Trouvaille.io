import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Alert, AsyncStorage, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Label, Button, Right, Content, Item, Form, Input, Left, Icon, Body, Title, Picker } from 'native-base';
import DateSelectCalendar from './DateSelectCalendar.js';
import Modal from 'react-native-modal';
import styles from '../styles.js';
import { DOMAIN, ACCESSKEY, SECRETKEY } from '../env.js';
import { LinearGradient } from 'expo';


export default class NewDriveScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date: '2017-12-20',
      departureCity: '',
      departureState: '',
      departureZip: '',
      destinationCity: '',
      destinationState: '',
      destinationZip: '',
      seatCount: '',
      costPerSeat: '',
      tripDetails: '',
      isModalVisible: false
    }
  }

  static navigationOptions = {
    title: 'New Driver'
  };

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })


  setTripDate(day) {

    //since no redux do we need to post it to server in function here?
    let update = Object.assign({}, this.state, {date: day.dateString})
      this._hideModal();
      this.setState(update)
    }


  setDepartureCity(departureCity) {
    let update = Object.assign({}, this.state, {departureCity: departureCity})
    if (departureCity.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid departure city')
    }
  }

  setDepartureState(departureState) {
    let update = Object.assign({}, this.state, {departureState: departureState})
    if (departureState.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid departure state')
    }
  }

  setDepartureZip(departureZip) {
    let update = Object.assign({}, this.state, {departureZip: departureZip})
    if (departureZip.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid departure zip')
    }
  }

  setDestinationCity(destinationCity) {
    let update = Object.assign({}, this.state, {destinationCity: destinationCity})
    if (destinationCity.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid destination city')
    }
  }

  setDestinationState(destinationState) {
    let update = Object.assign({}, this.state, {destinationState: destinationState})
    if (destinationState.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid destination state')
    }
  }

  setDestinationZip(destinationZip) {
    let update = Object.assign({}, this.state, {destinationZip: destinationZip})
    if (destinationZip.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid seat count')
    }
  }

  setSeatCount(seatCount) {
    let update = Object.assign({}, this.state, {seatCount: seatCount})
    if (seatCount.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid cost per seat')
    }
  }

  setSeatCost(seatCost) {
    let update = Object.assign({}, this.state, {seatCost: seatCost})
    if (seatCost.length > 0) {
      this.setState(update)
    } else{
      alert('Not a valid departure city')
    }
  }

  setTripDetails(text) {
      let update = Object.assign({}, this.state, {tripDetails: text})
      this.setState(update)
  }

  submitTrip( date, departureCity, departureState, departureZip, destinationCity,
    destinationState, destinationZip, seatCount, seatCost, tripDetails
  ) {
    fetch(`${DOMAIN}/newTrip`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        departureCity: departureCity,
        departureState: departureState,
        departureZip: departureZip,
        destinationCity: destinationCity,
        destinationState: destinationState,
        destinationZip: destinationZip,
        seatCount: seatCount,
        seatCost: seatCost,
        tripDetails: tripDetails
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success){
        return this.props.navigation.navigate('UserFeed');
      } else {
        alert(responseJson.error)
        console.log('Error submitting Trip', responseJson.error);
      }
    })
    .catch((err) => {
      console.log('caught errror in catch of submitting trip');
      alert(err)
    });
  }

  goBack() {
    this.props.navigation.navigate('UserFeed')
  }

  DriverDestinationMap() {
    this.props.navigation.navigate('DriverMap');
  }

  render() {
    return (

      <LinearGradient colors={['#00C9FF', '#92FE9D']} style={{height: Dimensions.get('window').height}}>
      <Header style={{backgroundColor: 'transparent'}}>
        <Left>
          <Button transparent>
            <Icon name='ios-arrow-back' onPress={() => {this.goBack()}} style={{color: 'white'}}/>
          </Button>
        </Left>
        <Body>
          <Title style={{fontSize: 25, textAlign: 'center', color: 'white'}}>New Trip</Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <ScrollView>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 40, paddingTop: 20}}>
        <View style={{ flex: 1, backgroundColor: 'transparent'}}>
        <Label style={{color: 'white'}}>Pick Date</Label>
          <TouchableOpacity onPress={this._showModal} style={{alignItems: 'center'}}>
            <Icon active name='ios-calendar-outline' style={{color: 'white'}} />
          </TouchableOpacity>
          <Modal style={styles.calendarModal} isVisible={this.state.isModalVisible}>
            <View style={styles.calendarView}>
              <DateSelectCalendar
                initialDate={this.state.date}
                changeDay={ (day) => this.setTripDate(day) }
                closeModal={ () => this._hideModal() }>
              </DateSelectCalendar>
              {/* <TouchableOpacity
                title='hide modal'
                color='#841584'
                onPress={this._hideModal}>
                  <Text>Hide Modal</Text>
                </TouchableOpacity> */}
            </View>
          </Modal>
        </View>

        <TextInput
            placeholder='Departure City'
            style={styles.inputField2}
            onChangeText={(text) => this.setDepartureCity(text)}
        ></TextInput>

        <Item stackedLabel>
          <Label style={{color: 'black'}}>Departure State</Label>
        <Picker
              renderHeader={backAction =>
                <Header style={{ backgroundColor: "#6C3483" }}>
                  <Left>
                    <Button transparent onPress={backAction}>
                      <Icon name="arrow-back" style={{ color: "#fff" }} />
                    </Button>
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#fff" }}>State Picker</Title>
                  </Body>
                  <Right />
                </Header>}
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.departureState}
              onValueChange={this.setDepartureState.bind(this)}
            >
            <Picker.Item label="Alabama" value="AL"/>
            <Picker.Item label="Alaska" value="AK"/>
            <Picker.Item label="American Samoa" value="AS"/>
            <Picker.Item label="Arizona" value="AZ"/>
            <Picker.Item label="Arkansas" value="AR"/>
            <Picker.Item label="California" value="CA"/>
            <Picker.Item label="Colorado" value="CO"/>
            <Picker.Item label="Connecticut" value="CT"/>
            <Picker.Item label="Delaware" value="DE"/>
            <Picker.Item label="District Of Columbia" value="DC"/>
            <Picker.Item label="Federated States Of Micronesia" value="FM"/>
            <Picker.Item label="Florida" value="FL"/>
            <Picker.Item label="Georgia" value="GA"/>
            <Picker.Item label="Guam" value="GU"/>
            <Picker.Item label="Hawaii" value="HI"/>
            <Picker.Item label="Idaho" value="ID"/>
            <Picker.Item label="Illinois" value="IL"/>
            <Picker.Item label="Indiana" value="IN"/>
            <Picker.Item label="Iowa" value="IA"/>
            <Picker.Item label="Kansas" value="KS"/>
            <Picker.Item label="Kentucky" value="KY"/>
            <Picker.Item label="Louisiana" value="LA"/>
            <Picker.Item label="Maine" value="ME"/>
            <Picker.Item label="Marshall Islands" value="MH"/>
            <Picker.Item label="Maryland" value="MD"/>
            <Picker.Item label="Massachusetts" value="MA"/>
            <Picker.Item label="Michigan" value="MI"/>
            <Picker.Item label="Minnesota" value="MN"/>
            <Picker.Item label="Mississippi" value="MS"/>
            <Picker.Item label="Missouri" value="MO"/>
            <Picker.Item label="Montana" value="MT"/>
            <Picker.Item label="Nebraska" value="NE"/>
            <Picker.Item label="Nevada" value="NV"/>
            <Picker.Item label="New Hampshire" value="NH"/>
            <Picker.Item label="New Jersey" value="NJ"/>
            <Picker.Item label="New Mexico" value="NM"/>
            <Picker.Item label="New York" value="NY"/>
            <Picker.Item label="North Carolina" value="NC"/>
            <Picker.Item label="North Dakota" value="ND"/>
            <Picker.Item label="Northern Mariana Islands" value="MP"/>
            <Picker.Item label="Ohio" value="OH"/>
            <Picker.Item label="Oklahoma" value="OK"/>
            <Picker.Item label="Oregon" value="OR"/>
            <Picker.Item label="Palau" value="PW"/>
            <Picker.Item label="Pennsylvania" value="PA"/>
            <Picker.Item label="Puerto Rico" value="PR"/>
            <Picker.Item label="Rhode Island" value="RI"/>
            <Picker.Item label="South Carolina" value="SC"/>
            <Picker.Item label="South Dakota" value="SD"/>
            <Picker.Item label="Tennessee" value="TN"/>
            <Picker.Item label="Texas" value="TX"/>
            <Picker.Item label="Utah" value="UT"/>
            <Picker.Item label="Vermont" value="VT"/>
            <Picker.Item label="Virgin Islands" value="VI"/>
            <Picker.Item label="Virginia" value="VA"/>
            <Picker.Item label="Washington" value="WA"/>
            <Picker.Item label="West Virginia" value="WV"/>
            <Picker.Item label="Wisconsin" value="WI"/>
            <Picker.Item label="Wyoming" value="WY"/>
            </Picker>
            </Item>

        <TextInput
            placeholder='Departure Zipcode'
            style={styles.inputField2}
            keyboardType = 'numeric'
            onChangeText={(text) => this.setDepartureZip(text)}
        ></TextInput>

        <TextInput
            placeholder='Destination City'
            style={styles.inputField2}
            onChangeText={(text) => this.setDestinationCity(text)}
        ></TextInput>

        <Item stackedLabel>
          <Label style={{color: 'black'}}>Destination State</Label>
        <Picker
              renderHeader={backAction =>
                <Header style={{ backgroundColor: "#6C3483" }}>
                  <Left>
                    <Button transparent onPress={backAction}>
                      <Icon name="arrow-back" style={{ color: "#fff" }} />
                    </Button>
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#fff" }}>State Picker</Title>
                  </Body>
                  <Right />
                </Header>}
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.destinationState}
              onValueChange={this.setDestinationState.bind(this)}
            >
            <Picker.Item label="Alabama" value="AL"/>
            <Picker.Item label="Alaska" value="AK"/>
            <Picker.Item label="American Samoa" value="AS"/>
            <Picker.Item label="Arizona" value="AZ"/>
            <Picker.Item label="Arkansas" value="AR"/>
            <Picker.Item label="California" value="CA"/>
            <Picker.Item label="Colorado" value="CO"/>
            <Picker.Item label="Connecticut" value="CT"/>
            <Picker.Item label="Delaware" value="DE"/>
            <Picker.Item label="District Of Columbia" value="DC"/>
            <Picker.Item label="Federated States Of Micronesia" value="FM"/>
            <Picker.Item label="Florida" value="FL"/>
            <Picker.Item label="Georgia" value="GA"/>
            <Picker.Item label="Guam" value="GU"/>
            <Picker.Item label="Hawaii" value="HI"/>
            <Picker.Item label="Idaho" value="ID"/>
            <Picker.Item label="Illinois" value="IL"/>
            <Picker.Item label="Indiana" value="IN"/>
            <Picker.Item label="Iowa" value="IA"/>
            <Picker.Item label="Kansas" value="KS"/>
            <Picker.Item label="Kentucky" value="KY"/>
            <Picker.Item label="Louisiana" value="LA"/>
            <Picker.Item label="Maine" value="ME"/>
            <Picker.Item label="Marshall Islands" value="MH"/>
            <Picker.Item label="Maryland" value="MD"/>
            <Picker.Item label="Massachusetts" value="MA"/>
            <Picker.Item label="Michigan" value="MI"/>
            <Picker.Item label="Minnesota" value="MN"/>
            <Picker.Item label="Mississippi" value="MS"/>
            <Picker.Item label="Missouri" value="MO"/>
            <Picker.Item label="Montana" value="MT"/>
            <Picker.Item label="Nebraska" value="NE"/>
            <Picker.Item label="Nevada" value="NV"/>
            <Picker.Item label="New Hampshire" value="NH"/>
            <Picker.Item label="New Jersey" value="NJ"/>
            <Picker.Item label="New Mexico" value="NM"/>
            <Picker.Item label="New York" value="NY"/>
            <Picker.Item label="North Carolina" value="NC"/>
            <Picker.Item label="North Dakota" value="ND"/>
            <Picker.Item label="Northern Mariana Islands" value="MP"/>
            <Picker.Item label="Ohio" value="OH"/>
            <Picker.Item label="Oklahoma" value="OK"/>
            <Picker.Item label="Oregon" value="OR"/>
            <Picker.Item label="Palau" value="PW"/>
            <Picker.Item label="Pennsylvania" value="PA"/>
            <Picker.Item label="Puerto Rico" value="PR"/>
            <Picker.Item label="Rhode Island" value="RI"/>
            <Picker.Item label="South Carolina" value="SC"/>
            <Picker.Item label="South Dakota" value="SD"/>
            <Picker.Item label="Tennessee" value="TN"/>
            <Picker.Item label="Texas" value="TX"/>
            <Picker.Item label="Utah" value="UT"/>
            <Picker.Item label="Vermont" value="VT"/>
            <Picker.Item label="Virgin Islands" value="VI"/>
            <Picker.Item label="Virginia" value="VA"/>
            <Picker.Item label="Washington" value="WA"/>
            <Picker.Item label="West Virginia" value="WV"/>
            <Picker.Item label="Wisconsin" value="WI"/>
            <Picker.Item label="Wyoming" value="WY"/>
            </Picker>
            </Item>
            
        <TextInput
            placeholder='Destination Zipcode'
            style={styles.inputField2}
            keyboardType = 'numeric'
            onChangeText={(text) => this.setDestinationZip(text)}
        ></TextInput>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width}}>
          <TextInput
              placeholder='#Seats'
              keyboardType = 'numeric'
              style={styles.inputField4}
              onChangeText={(text) => this.setSeatCount(text)}
          ></TextInput>

          <TextInput
              placeholder='Seat Price'
              keyboardType = 'numeric'
              style={styles.inputField4}
              onChangeText={(text) => this.setSeatCost(text)}
          ></TextInput>
        </View>

        <TextInput
            placeholder='Tell use why you are going on this trip :)'
            multiline={true}
            numberOfLines={10}
            maxHeight={90}
            style={styles.inputField3}
            onChangeText={(text) => this.setTripDetails(text)}
        ></TextInput>

        <TouchableOpacity style={[styles.button, styles.buttonLightBlue]} onPress={ () => {this.submitTrip(this.state.date, this.state.departureCity, this.state.departureState, this.state.departureZip, this.state.destinationCity, this.state.destinationState, this.state.destinationZip, this.state.seatCount, this.state.seatCost, this.state.tripDetails)}}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>
      </LinearGradient>
    )
  }
}
