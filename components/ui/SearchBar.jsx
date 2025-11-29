import { X } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import CustomTextInput from './CustomTextInput'

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <CustomTextInput
        placeholder="Search by name or specialization"
        value={value}
        onChangeText={onChange}
        autoCapitalize="words"
      />
      {value ? (
        <TouchableOpacity style={styles.clear} onPress={() => onChange('')}>
          <X size={16} color="#666" />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    position: 'relative',
  },
  clear: {
    position: 'absolute',
    right: 24,
    top: 22,
    zIndex: 10,
    padding: 6,
  }
})

export default SearchBar
