import React from 'react'
import { Card, Button, Flex, Text } from "@radix-ui/themes"
import { useMessaging } from '../contexts/MessagingContext'

const aiMessages = [
	"Hello, what's new with you?",
	"I'm building an open-source social media website with Rails 8 and React 19",
	"What are the best optimization strategies for managing large-scale data in a Rails + React app?",
	"Best practices for implementing efficient, scalable virtualized lists in React",
	"How would you implement cursor-based pagination in Rails?",
	"Recommended approaches for multi-database support and sharding in Rails 8?",
	"I'm actively looking for new opportunities as a full-stack developer, is LinkedIn a good place to find them?"
]

const MessageDebugPanel = () => {
  const { sendMessage } = useMessaging()

  const generateMessages = (count, interval = 50) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const str = Math.random().toString(36).substring(2, 10)
				const charCount = Math.floor(Math.random() * 500) + 50
        sendMessage(`${str.repeat(Math.ceil(charCount / str.length))} (${i + 1})`)
      }, i * interval)
    }
  }

	const generateAIMessages = (count, interval = 50) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        sendMessage(`@AI ${aiMessages[Math.floor(Math.random() * aiMessages.length)]}`)
      }, i * interval)
    }
  }

  return (
    <Card p="3" className="bg-gray-100 m-2">
      <Text size="2" weight="bold" mb="2">Message Debug Panel</Text>
      <Flex gap="2">
        <Button
          size="1"
          variant="soft"
          onClick={() => generateMessages(10)}
        >
          10 Messages
        </Button>
        <Button
          size="1"
          variant="soft"
          onClick={() => generateMessages(50)}
        >
          50 Messages
        </Button>
				<Button
          size="1"
          variant="soft"
          onClick={() => generateAIMessages(5)}
        >
          AI Messages
        </Button>
      </Flex>
    </Card>
  )
}

export default MessageDebugPanel
