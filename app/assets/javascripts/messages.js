// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/


App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    var messages = document.getElementById("messages")
    var messageItem = document.createElement("code")
    messageItem.innerText = "Welcome to the room.\n\n"
    messages.appendChild(messageItem)
    messages.scrollTop = messages.scrollHeight
  },

  disconnected: function() {

  },

  received: function(data) {
    var messageInput = document.getElementById("messageInput")
    var messages = document.getElementById("messages")
    var messageItem = document.createElement("code")
    messageItem.innerText = `${data.username} (${moment().format('hh:mm a')}) \n -> ${data.content} \n\n`
    messageInput.value = ""
    messages.appendChild(messageItem)
    messages.scrollTop = messages.scrollHeight
  },

  speak: function() {

  }
})
