import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 36,
    marginTop: 30,
    fontSize: 14,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 150,
    marginRight: 60,
  },
  nameRow: {
    flexDirection: 'row',
    // flexGrow: 1,
  },
  nameLabelColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  nameLabel: {
    marginRight: 10,
    color: '#666666',
    justifySelf: 'start',
    alignSelf: 'start',
  },
  nameContentColumn: {
    flexDirection: 'column',
    flexGrow: 4,
  },
  nameContent: {
    flex: 1,
    justifySelf: 'start',
    alignSelf: 'start',
  },
  rightColumn: {
    flexDirection: 'column',
    width: 260,
  },
  addressRow: {
    flexDirection: 'row',
    // flexGrow: 1,
  },
  addressLabelColumn: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  addressLabel: {
    marginRight: 10,
    color: '#666666',
    justifySelf: 'start',
    alignSelf: 'start',
  },
  addressContentColumn: {
    flexDirection: 'column',
    flexGrow: 4,
  },
  addressContent: {
    flex: 1,
    justifySelf: 'start',
    alignSelf: 'start',
  },
})

const CreatePDFClient = ({ client }) => (
  <View style={styles.container}>
    <View style={styles.leftColumn}>
      <View style={styles.nameRow}>
        <View style={styles.nameLabelColumn}>
          <Text style={styles.nameLabel}>Client</Text>
        </View>
        <View style={styles.nameContentColumn}>
          <Text style={styles.nameContent}>{client.clientName}</Text>
        </View>
      </View>
    </View>
    <View style={styles.rightColumn}>
      <View style={styles.addressRow}>
        <View style={styles.addressLabelColumn}>
          <Text style={styles.addressLabel}>Address</Text>
        </View>
        <View style={styles.addressContentColumn}>
          <Text style={styles.addressContent}>{client.clientAddress}</Text>
        </View>
      </View>
    </View>
  </View>
)

CreatePDFClient.propTypes = {
  client: PropTypes.any,
}

export default CreatePDFClient
