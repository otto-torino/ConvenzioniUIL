import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ApplicationStyles from '../Themes/ApplicationStyles'
import { Colors } from '../Themes/'

const propTypes = {
  navigation: PropTypes.object.isRequired
}

const DrawerIcon = (props) => {
  return (
    <TouchableOpacity>
      <Icon
        name='menu'
        color={Colors.snow}
        style={ApplicationStyles.drawer.icon}
        onPress={() => props.navigation.navigate('DrawerOpen')}
        size={24} />
    </TouchableOpacity>
  )
}

DrawerIcon.propTypes = propTypes
export default DrawerIcon
