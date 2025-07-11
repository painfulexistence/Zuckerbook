import React, { createContext, useContext, useState, useEffect } from "react"
import { useCable } from "./CableContext"
import { useAuth } from "./AuthContext"
import { MessagesAPI } from "../services/api"

const MessagingContext = createContext()

export const useMessaging = () => {
  const context = useContext(MessagingContext)
  if (!context) {
    throw new Error('useMessaging must be used within an MessagingProvider')
  }
  return context
}

export const MessagingProvider = ({ children }) => {
  const cable = useCable()
	const { currentUser } = useAuth()
	const [messages, setMessages] = useState([])

	useEffect(() => {
		if (cable) {
			const params = {
				channel: "RoomChannel",
				// client_id: "" // TODO: generate and send client ID
			}
			const sub = cable.subscriptions.create(params, {
				connected() {
					console.log("connected")
				},
				disconnected() {
					console.log("disconnected")
				},
				received(data) {
					console.log("Message received", data)
					// TODO: use client ID
					if (data.user.id === currentUser.id) {
						return
					}
					const newMessage = {
						id: Date.now(),
						text: data.content,
						sender: "other",
						username: data.user.name,
						timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
					}
					setMessages(prev => [...prev, newMessage])
				}
			})
			return () => {
				sub.unsubscribe("RoomChannel")
				setMessages([])
			}
		}
	}, [cable, currentUser])

	const sendMessage = async (message) => {
		const isAiMentioned = message.includes("@AI ")
		const newMessage = {
			id: Date.now(),
			text: message,
			sender: "user",
			username: "Me",
			timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		}
		setMessages(prev => [...prev, newMessage])

		const hasSent = await MessagesAPI.create({
			content: message,
			ai_mentioned: isAiMentioned,
			context: messages.slice(-10)
		})
		if (hasSent) {
			console.log("Message sent successfully")
			// TODO: add checkmark to message
		}
	}

  return (
    <MessagingContext.Provider value={{ messages, sendMessage }}>
      { children }
    </MessagingContext.Provider>
  )
}