import React, { Component } from 'react';
import {
  Text,
  Button,
  Image,
  AsyncStorage
} from 'react-native';
import {Content} from 'native-base';
import { DOMAIN } from '../env.js';

export default class Sidebar extends Component {

  logout = () => {
    fetch(`${DOMAIN}/logout`, {
      method: 'GET',
    }
    ).then((response) => {
      console.log(response);
      return response.json()
    })
    .then( async (responseJson) => {
      console.log(responseJson);
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
       if(responseJson.success){
           // return this.props.navigation.goBack();
           try {
             let logoutAwait = await AsyncStorage.removeItem('user')
             console.log(logoutAwait,'^^^^^^^^^^^^');

           } catch (e) {
             console.log('error in await async logout: ', e);
           }
           return this.props.navigation.navigate('Login');

       }else{
           alert(responseJson.error)
           console.log('THERE WAS AN ERROR SIGNING OUT', responseJson.error);
       }
    })
    .catch((err) => {
        console.log('caught error in catch of submt');
        console.log(`${DOMAIN}/register`);
        alert(err)
      /* do something if there was an error with fetching */
    });
  }

  render() {
    return (
          <Content style={{backgroundColor:'rgba(28,28,28,.9)'}}>
            <Image
              style={{width:100, height: 100, marginLeft: 100}}
              source={require('../assets/rick_ricknmorty.png')}
            />
            <Button style={{color: 'white'}} title='Profile'></Button>
            <Button title='Explore Local Trips'></Button>
            <Button title='Previous Trips'></Button>
            <Button title='Popular Trips'></Button>
            <Button title='Settings'></Button>
            <Button onPress={ () => this.logout() } title='Logout'></Button>
          </Content>
    );
  }
}

module.exports = Sidebar;