import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView } from 'react-native'
import Communications from 'react-native-communications'
import HTMLView from 'react-native-htmlview'
import FullWidthImage from './FullWidthImage'
import Banner from '../Containers/Banner'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../Themes/Colors'

// Styles
import styles from '../Containers/Styles/RetailerScreenStyles'

const RetailerInfo = props => {
  let image = null
  if (props.retailer.company.images && props.retailer.company.images.length) {
    image = (
      <FullWidthImage source={{ uri: props.retailer.company.images[0] }} />
    )
  }

  let actions = []
  if (props.retailer.phone || props.retailer.company.phone) {
    actions.push({
      icon: (
        <Icon
          name='phone'
          color={Colors.accent}
          size={40}
          onPress={() =>
            Communications.phonecall(
              props.retailer.phone || props.retailer.company.phone,
              true
            )
          }
        />
      ),
      label: 'chiama'
    })
  }
  if (props.retailer.email || props.retailer.company.email) {
    actions.push({
      icon: (
        <Icon
          name='envelope'
          color={Colors.accent}
          size={40}
          onPress={() =>
            Communications.email(
              [props.retailer.email || props.retailer.company.email],
              null,
              null,
              'Richiesta informazioni',
              ''
            )
          }
        />
      ),
      label: 'e-mail'
    })
  }
  if (props.retailer.web || props.retailer.company.web) {
    actions.push({
      icon: (
        <Icon
          size={40}
          color={Colors.accent}
          name='globe'
          onPress={() =>
            Communications.web(props.retailer.web || props.retailer.company.web)
          }
        />
      ),
      label: 'sito web'
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={[styles.section, { paddingBottom: 60, marginTop: 0 }]}>
          <Text style={styles.sectionTitle}>{props.retailer.company.name}</Text>
          {image}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            {actions.map((a, index) => {
              return (
                <View key={'action-' + index} style={{ alignItems: 'center' }}>{a.icon}<Text>{a.label}</Text></View>
              )
            })}
          </View>
          <Text style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 20 }}>
            {props.retailer.address}, {props.retailer.cap} {props.retailer.city}
          </Text>
          <HTMLView
            value={props.retailer.company.text.replace(/(\r\n|\n|\r)/gm, '')}
          />
          <View style={{ marginTop: 20 }}>
            <Banner />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

RetailerInfo.propTypes = {
  retailer: PropTypes.shape({
    address: PropTypes.string,
    cap: PropTypes.string,
    city: PropTypes.string,
    web: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.object
  })
}

export default RetailerInfo
