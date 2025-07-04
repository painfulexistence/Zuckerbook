import consumer from "./consumer"
import moment from "moment"

consumer.subscriptions.create("RoomChannel", {
	connected() {
		const messages = document.getElementById("messages")
		if (messages) {
			const messageItem = document.createElement("code")
			messageItem.innerText = "Welcome to the room.\n\n"
			messages.appendChild(messageItem)
			messages.scrollTop = messages.scrollHeight
		}
	},

	disconnected() {
		// Called when the subscription has been terminated by the server
	},

	received(data) {
		const messageInput = document.getElementById("messageInput")
		const messages = document.getElementById("messages")

		if (messages) {
			const messageItem = document.createElement("code")
			messageItem.innerText = `${data.username} (${moment().format('hh:mm a')}) \n -> ${data.content} \n\n`
			messages.appendChild(messageItem)
			messages.scrollTop = messages.scrollHeight
		}

		if (messageInput) {
			messageInput.value = ""
		}
	},

	speak(content) {
		this.perform('speak', { content: content })
	}
})
