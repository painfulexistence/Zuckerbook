import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Button,
  Text,
  Flex,
  TextArea,
	TextField,
  IconButton,
  Card,
  Container
} from "@radix-ui/themes"
import {
  ChevronDownIcon,
  PaperPlaneIcon,
  ChatBubbleIcon
} from "@radix-ui/react-icons"
import { useMessaging } from '../contexts/MessagingContext'

const MessageBox = () => {
	const { messages, sendMessage } = useMessaging()
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: auto scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
			if (inputMessage.trim()) {
				sendMessage(inputMessage)
				setInputMessage("")
				messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
			}
    }
  }

  return (
    <Box className="fixed bottom-0 right-0 z-50" style={{ right: 0, width: "400px" }}>
      {!isExpanded && (
        <Card
          className="transition-all duration-200 cursor-pointer shadow-lg zucker-panel"
          style={{
            borderRadius: '50px',
            padding: '12px 20px'
          }}
          onClick={() => setIsExpanded(true)}
        >
          <Flex align="center" gap="2">
            <ChatBubbleIcon color="white" />
            <Text color="white" weight="medium">Messages</Text>
          </Flex>
        </Card>
      )}

      {isExpanded && (
        <Card
          className="shadow-2xl border border-gray-200 transition-all duration-300 zucker-panel custom-slide-in"
          style={{ borderRadius: "20px", width: "400px", height: "500px", overflow: "hidden" }}
        >
          <Box className="p-4">
            <Flex justify="between" align="center">
              <Flex align="center" gap="2">
                <ChatBubbleIcon color="white" />
                <Text color="white" weight="bold" size="4">Messages</Text>
              </Flex>
              <IconButton
                variant="ghost"
                color="white"
                onClick={() => setIsExpanded(false)}
              >
                <ChevronDownIcon />
              </IconButton>
            </Flex>
          </Box>

          <Box
            className="flex-1 p-4 overflow-y-auto"
            style={{ height: "350px" }}
          >
            <Flex direction="column" gap="3">
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  className={`max-w-[80%] ${
                    msg.sender === 'user' ? 'self-end' : 'self-start'
                  }`}
                >
                  <Card
                    className={`p-3 ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                    style={{
											width: "200px",
                      borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
                    }}
                  >
										<Text size="2" weight="bold">{msg.username}</Text>
										<br />
                    <Text size="2">{msg.text}</Text>
										<br/>
                    <Text
                      size="1"
                      className={`mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp}
                    </Text>
                  </Card>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Flex>
          </Box>

          <Box className="p-2 border-t border-gray-200" style={{ height: "50px" }}>
            <Flex gap="2" align="center">
              <TextField.Root
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 resize-none"
                style={{ borderRadius: '20px', height: "40px" }}
              />
              <IconButton
                onClick={() => sendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
                className="disabled:bg-gray-300"
                style={{ borderRadius: '50%' }}
              >
                <PaperPlaneIcon color="white" />
              </IconButton>
            </Flex>
          </Box>
        </Card>
      )}
    </Box>
  )
}

export default MessageBox
