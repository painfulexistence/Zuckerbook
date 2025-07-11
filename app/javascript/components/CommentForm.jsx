import React, { useState } from 'react'
import { CommentsAPI } from '../services/api'
import { Flex, TextField, Button } from "@radix-ui/themes"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from '@tanstack/react-query'

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const commentCreateMutation = useMutation({
    mutationFn: (content) => CommentsAPI.create(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      setContent("")
    },
    onError: (error) => {
      console.error('Error creating comment:', error)
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim() || commentCreateMutation.isPending) return

    commentCreateMutation.mutate(content)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="2" align="end">
        <TextField.Root
          style={{ flex: 1 }}
          size="2"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Write a comment..."
					required
					autoComplete="off"
					id="comment-field"
					disabled={commentCreateMutation.isPending}
        />

        <Button
          type="submit"
          size="2"
          disabled={!content.trim() || commentCreateMutation.isPending}
          style={{ flexShrink: 0 }}
        >
          <PaperPlaneIcon width="14" height="14" />
        </Button>
      </Flex>
    </form>
  )
}

export default CommentForm
