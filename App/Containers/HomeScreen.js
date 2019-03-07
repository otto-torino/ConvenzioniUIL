import React, { Component } from 'react'
import { Toolbar, Avatar } from 'react-native-material-ui'
import Button from '../Components/Button'
import { TextField } from 'react-native-material-textfield'
import Toast from 'react-native-simple-toast'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { navigate } from '../Services/NavigationService'
import AgreementsActions from '../Redux/AgreementsRedux'
import Banner from './Banner'
import { Colors } from '../Themes/'

// Styles
import styles from './Styles/HomeScreenStyles'

class HomeScreen extends Component {
  constructor () {
    super()
    this.onSearch = this.onSearch.bind(this)
  }

  componentDidMount () {
    console.log('MOUNTED HOME SCREEN')
  }

  render () {
    return (
      <View>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigate('DrawerOpen')}
          centerElement='Convenzioni UIL'
        />
        <KeyboardAwareScrollView style={styles.container}>
          <View style={[styles.section, { paddingBottom: 50, marginTop: 0 }]}>
            <KeyboardAvoidingView
              behavior='position'
              keyboardVerticalOffset={100}
            >
              <Text style={styles.sectionText}>
                Ricerca la tua convenzione per
              </Text>
              <Button
                raised
                accent
                text='Categoria'
                onPress={() => navigate('CategoriesScreen')}
              />
              <Text style={styles.sectionTextSmallMarginBottom}>
                oppure per nome prodotto o azienda
              </Text>
              <TextField
                defaultValue={this.props.searchText}
                onSubmitEditing={this.onSearch}
                onEndEditing={this.onSearch}
                label='Prodotto/Azienda'
                ref={'searchText'}
              />
              <TouchableOpacity style={{ alignItems: 'center', marginVertical: 10 }} onPress={this.onSearch}>
                <Avatar
                  icon='search'
                  size={60}
                  iconColor={'black'}
                  style={{
                    container: {
                      backgroundColor: Colors.secondary,
                      margin: 'auto'
                    }
                  }}
                />
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.banner}>
              <Banner />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }

  onSearch () {
    console.log('clicked')
    let searchText = this.refs['searchText'].value()
    if (searchText === '' || searchText === undefined) {
      Toast.show('Inserire un testo di ricerca')
      return
    }

    this.props.dispatch(AgreementsActions.setSearchText(searchText))
    navigate('SearchResultScreen')
  }
}

HomeScreen.propTypes = {
  searchText: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    searchText: state.agreements.searchText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
