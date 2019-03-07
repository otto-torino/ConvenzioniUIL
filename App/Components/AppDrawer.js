/**
 * AppDrawer
 * @flow
 */
import React, { Component } from 'react'
import {
  Drawer
} from 'react-native-material-ui'
import { Image } from 'react-native'
import { Images } from '../Themes'
import { navigate } from '../Services/NavigationService'

export default class AppDrawer extends Component {
  render () {
    return (
      <Drawer>
        <Drawer.Header>
          <Image source={Images.logo} />
        </Drawer.Header>
        <Drawer.Section
          divider
          items={[
            {
              icon: 'home',
              value: 'Home',
              onPress: () => {
                console.log('TO HOME')
                navigate('HomeScreen')
              }
            },
            {
              icon: 'label',
              value: 'Categorie',
              onPress: () => {
                console.log('TO CTGS')
                navigate('CategoriesScreen')
              }
            },
            {
              icon: 'email',
              value: 'Newsletter',
              onPress: () => {
                console.log('TO NEWSLETTER')
                navigate('NewsletterScreen')
              }
            },
            {
              icon: 'star',
              value: 'Credits',
              onPress: () => {
                console.log('TO CREDITS')
                navigate('CreditsScreen')
              }
            }
          ]}
        />
      </Drawer>
    )
  }
}
