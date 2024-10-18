import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { mainStyle } from '../main-style'
import { darkenColor, theme } from '../theme'

const LabelControl = ({ title, isRequired = false, style = {} }) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, ...{ fontWeight: 'bold' } }}>{title}</Text>
      {isRequired && <Text style={mainStyle.dangerColor}>*</Text>}
    </View >
  )
}

export default LabelControl

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginTop: theme.labelSpacing
  },
  text: {
    color:  theme.controlLabelColor,
    fontSize: theme.controlLabelFontSize,
    fontFamily: theme.fontFamily,
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    
  }
})