import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { CommentsAPI } from '../services/api'
import { Box, Flex, Avatar, Text, Button } from "@radix-ui/themes"
import { TrashIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Comment = ({ comment }) => {
  const { currentUser } = useAuth()
	const queryClient = useQueryClient()

	const commentRemoveMutation = useMutation({
		mutationFn: () => CommentsAPI.delete(comment.post_id, comment.id),
		onSuccess: () => {
			queryClient.invalidateQueries(['posts'])
		},
		onError: (error) => {
			console.error('Error deleting comment:', error)
		}
	})

  const handleDelete = () => {
    if (!confirm('Are you sure?')) return
		commentRemoveMutation.mutate()
  }

  const getAvatarUrl = (user) => {
    if (user?.avatar_url) {
      return user.avatar_url
    }
    return ""
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Box
      id={`comment-${comment.id}`}
      p="3"
      mb="2"
      style={{
        backgroundColor: 'var(--gray-1)',
        borderRadius: 'var(--radius-3)',
        border: '1px solid var(--gray-4)'
      }}
    >
      <Flex gap="3" align="start">
        <Avatar
          size="2"
          fallback={comment.user?.name?.charAt(0) || 'U'}
          radius="full"
          src={getAvatarUrl(comment.user)}
          alt={comment.user?.name || 'User'}
        />

        <Box style={{ flex: 1 }}>
          <Flex gap="2" align="center" mb="1">
						<Link to={`/z/users/${comment.user?.id}`}>
							<Text size="2" weight="medium" color="gray">
								{comment.user?.name || 'Unknown User'}
							</Text>
						</Link>
            <Text size="1" color="gray">
              {formatDate(comment.created_at)}
            </Text>
          </Flex>

          <Text size="2" style={{ lineHeight: 1.5 }}>
            {comment.content}
          </Text>
        </Box>

        {currentUser?.id === comment.user?.id && (
          <Button
            size="1"
            variant="ghost"
            color="red"
            onClick={handleDelete}
            style={{ flexShrink: 0 }}
          >
            <TrashIcon width="12" height="12" />
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default Comment
