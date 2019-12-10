import React from 'react'
import { Text, View, Image, StyleSheet } from '@react-pdf/renderer'

const logo = require('../../assets/logo.png')
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderBottomStyle: 'solid',
    height: 36,
    fontSize: 16,
  },
  logoColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  logo: {
    justifySelf: 'flex-start',
    alignSelf: 'flex-start',
    width: '40%',
    height: '40%',
  },
  textColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  text: {
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
})

export default () => (
  <View style={styles.container}>
    <View style={styles.logoColumn}>
      <Image
        style={styles.logo}
        src={logo}
      />
    </View>
    <View style={styles.textColumn}>
      <Text style={styles.text}>
        Purchase Order
      </Text>
    </View>
  </View>
)
