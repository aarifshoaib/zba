import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet
} from 'react-native';
import { lightenColor, theme } from '../theme';
import AppIcon from './icons';



const CustomRadioButton = ({ label, selected, onSelect, icon = { type: null, name: null } }) => (

  <TouchableOpacity
    style={[styles.radioButton,
    { backgroundColor: selected ? lightenColor(theme.tint, .3) : theme.background, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
    onPress={onSelect}>
    <View style={{marginRight: 4}}>
      {icon.name && icon.type && <AppIcon name={icon.name} size={20} color={selected ? theme.primary : theme.secondary} type={icon.type} />}
    </View>
    <Text style={[styles.radioButtonText,
    { color: selected ? theme.primary : theme.secondary }]}>
      {label}
    </Text>
  </TouchableOpacity>

);

export default CustomRadioButton;

const styles = StyleSheet.create({
  container: {
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: theme.controlBorderColor,
    marginEnd: 7,
  },
  radioButtonText: {
    fontSize: 16,
  },
}); 