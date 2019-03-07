import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from '../Services/NavigationService'
import { View, ScrollView } from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from './Styles/CategoriesScreenStyles'

class CategoriesScreen extends Component {
  constructor () {
    super()
    this.state = {
      searchText: null
    }
  }

  componentDidMount () {
    console.log('MOUNTED CATEGORIES SCREEN')
  }

  onPress (category) {
    return () => {
      navigate('CategoryScreen', {
        category: category
      })
    }
  }

  categories () {
    return this.props.categories
      .filter(obj => {
        return (
          !this.state.searchText ||
          obj.name.toLowerCase().indexOf(this.state.searchText) !== -1
        )
      })
      .map(obj => {
        return (
          <ListItem
            divider
            centerElement={{
              primaryText: obj.name
            }}
            rightElement={
              <Icon name='angle-right' style={{ marginRight: 5 }} size={30} />
            }
            key={obj.id}
            onPress={this.onPress(obj)}
          />
        )
      })
  }

  render () {
    return (
      <View>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigate('DrawerOpen')}
          centerElement='Categorie'
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: text => this.setState({ searchText: text })
          }}
        />
        <ScrollView style={styles.container}>
          <View>
            {this.categories()}
          </View>
        </ScrollView>
      </View>
    )
  }
}

CategoriesScreen.propTypes = {
  categories: PropTypes.array
}

const mapStateToProps = state => {
  return {
    categories: state.agreements.categories
  }
}

export default connect(mapStateToProps, null)(CategoriesScreen)
