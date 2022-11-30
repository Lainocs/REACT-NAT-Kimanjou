import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Messages from '../components/chat/Messages'
import {
	addDoc,
	collection,
	query,
	serverTimestamp,
	where,
	getDocs,
	getDoc,
	doc,
} from 'firebase/firestore'
import { auth, db } from '../firebase'

const ChatScreen = ({ route }) => {
	const { roomId } = route.params

	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

	const handleSendMessage = async () => {
		try {
			await addDoc(collection(db, 'rooms_messages'), {
				roomId: roomId,
				userEmail: auth.currentUser.email,
				message: message,
				timestamp: serverTimestamp(),
			})
			setMessage('')
			handleGetMessages()
		} catch (e) {
			console.error('Error adding document: ', e)
		}
	}

	const handleGetMessages = async () => {
		let q = query(
			collection(db, 'rooms_messages'),
			where('roomId', '==', roomId)
		)
		const querySnapshot = await getDocs(q)
		const messages = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		messages.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)

		setMessages(messages)
	}

  const handleGetUsers = async () => {

  }

	useEffect(() => {
		handleGetMessages()
	}, [])

	return (
		<View style={styles.container}>
			<Messages messages={messages} />
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Message...'
					name='message'
					value={message}
					onChangeText={(text) => setMessage(text)}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={handleSendMessage}
				>
					<Text style={styles.buttonText}>Send</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default ChatScreen

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: '90%',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
	},

	input: {
		backgroundColor: '#E1E1E1',
		padding: 15,
		width: '80%',
		borderRadius: 30,
	},
	button: {
		backgroundColor: '#2C6BED',
		width: '20%',
		padding: 15,
		borderRadius: 30,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
	},
})