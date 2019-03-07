import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: 0,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionTitle: {
      ...Fonts.style.h4,
      paddingTop: Metrics.doubleBaseMargin,
      color: Colors.black,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.black,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    sectionTextSmall: {
      ...Fonts.style.small,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.black,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    sectionTextSmallMarginBottom: {
      ...Fonts.style.normal,
      paddingTop: Metrics.doubleBaseMargin,
      color: Colors.black,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.black,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    alignItems: 'center',
    textAlign: 'center'
  },
  drawer: {
    icon: {
      fontSize: 30,
      marginLeft: 12
    }
  }
}

export default ApplicationStyles
