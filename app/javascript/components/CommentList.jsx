import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import { Box, Text, Flex } from "@radix-ui/themes"
import { ChatBubbleIcon } from "@radix-ui/react-icons"

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <Box mt="3" pt="3" style={{ borderTop: '1px solid var(--gray-6)' }}>
        <Flex align="center" gap="2">
          <ChatBubbleIcon width="16" height="16" color="gray" />
          <Text size="2" color="gray">No comments yet</Text>
        </Flex>
      </Box>
    )
  }

  return (
    <Box mt="2" pt="2" style={{ borderTop: '1px solid var(--gray-6)' }}>
			{comments.toReversed().map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
    </Box>
  )
}

export default CommentList
