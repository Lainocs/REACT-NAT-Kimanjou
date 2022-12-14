import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JoinRoom from '../buttons/JoinRoom'
import NewRoom from '../buttons/NewRoom'

const RoomManage = ({displayModal}) => {
  return (
    <View style={styles.container}>
      <JoinRoom displayModal={displayModal} />
      <NewRoom />
    </View>
  )
}

export default RoomManage

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'start',
  },
})