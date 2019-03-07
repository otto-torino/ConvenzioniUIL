import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ScrollView } from 'react-native'
import { ListItem } from 'react-native-material-ui'
import Communications from 'react-native-communications'
import Icon from 'react-native-vector-icons/FontAwesome'

const RetailerAttachments = props => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {props.retailer.company.attachments.map((a, k) => {
          return (
            <ListItem
              divider
              leftElement={
                <Text style={{ textAlign: 'center' }}>{a.extension}</Text>
              }
              centerElement={
                <View>
                  <Text style={{ color: 'black' }}>{a.name}</Text>
                  <Text>{a.size}</Text>
                </View>
              }
              rightElement={
                <Icon name='angle-right' style={{ marginRight: 5 }} size={30} />
              }
              key={'att-' + k}
              onPress={() => { Communications.web(a.url) }}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

RetailerAttachments.propTypes = {
  retailer: PropTypes.shape({
    company: PropTypes.shape({
      attachments: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        size: PropTypes.string,
        extension: PropTypes.string
      }))
    })
  })
}

export default RetailerAttachments
