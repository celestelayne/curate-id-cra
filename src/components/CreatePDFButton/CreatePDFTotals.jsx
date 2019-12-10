import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { formatCurrency } from '../../util'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 36,
    marginTop: 15,
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    width: '50%',
  },
  titleRow: {
    flexDirection: 'row',
  },
  titleContent: {
    flex: 1,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    width: '50%',
    marginLeft: 10,
  },
  rightRow: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  priceColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  priceContent: {
    justifySelf: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  quantityColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  quantityContent: {
    justifySelf: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  totalColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  totalContent: {
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 15,
    fontSize: 12,
  },
})

export default (totalPrice) => (
  <View style={styles.container}>
    <View style={styles.leftColumn}>
      <View style={styles.titleRow}>
        <Text style={styles.titleContent} />
      </View>
    </View>
    <View style={styles.rightColumn}>
      <View style={styles.rightRow}>
        <View style={styles.priceColumn}>
          <Text style={styles.priceContent} />
        </View>
        <View style={styles.quantityColumn}>
          <Text style={styles.quantityContent} />
        </View>
        <View style={styles.totalColumn}>
          <Text style={styles.totalContent}>{formatCurrency(totalPrice.totalPrice)}</Text>
        </View>
      </View>
    </View>
  </View>
)
