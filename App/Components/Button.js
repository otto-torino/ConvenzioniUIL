import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-native-material-ui'
import Colors from '../Themes/Colors'

const CustomButton = props => {
  return (
    <Button
      {...props}
      style={{
        container: {
          alignSelf: props.fullWidth ? 'stretch' : 'center',
          backgroundColor: Colors.secondary
        },
        text: { color: 'black' }
      }}
    />
  )
}

CustomButton.propTypes = {
  fullWidth: PropTypes.bool
}

export default CustomButton
