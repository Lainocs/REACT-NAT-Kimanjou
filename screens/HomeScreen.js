import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Bienvenue sur Kimanjou</Text>
		</View>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})