import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PostsAPI } from '../services/api'
import PostForm from './PostForm'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { Card, Flex, Avatar, Box, Heading, Text, Button, Badge } from "@radix-ui/themes";
import { HeartIcon, ChatBubbleIcon } from "@radix-ui/react-icons";

const Post = ({ post, onUpdate }) => {
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { currentUser } = useAuth()

  const handleLike = async () => {
    try {
      await PostsAPI.like(post.id)
      onUpdate() // Refresh posts
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) return

    try {
      await PostsAPI.delete(post.id)
      onUpdate() // Refresh posts
    } catch (error) {
      console.error('Error deleting post:', error)
    }
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

  if (isEditing) {
    return (
      <PostForm
        post={post}
        onSave={() => {
          setIsEditing(false)
          onUpdate()
        }}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return (
		<Card id={`post-${post.id}`} >
      <div id="post-head">
        <Flex direction="row" gap="2">
          <div className="navbar-left" id="post-user-image">
						<Avatar
							size="3"
							fallback="R"
							radius="full"
							src={getAvatarUrl(post.user)}
							alt={post.user?.name || 'User'}
						/>
            &nbsp;&nbsp;
          </div>
          <Box className="navbar-left" id="post-info">
            <Link to={`/z/users/${post.user?.id}`}>
							<Heading size="6" as="h2" color="green" className="btn" id="post-name">{post.user?.name || 'Unknown User'}</Heading>
            </Link>
						<Text size="1" color="gray" mb="2" id="post-time">
							<i className={`fa ${post.public ? 'fa-globe' : 'fa-user-circle-o'}`} />&nbsp;
							Published at {formatDate(post.created_at)}
						</Text>
          </Box>
          {currentUser?.id === post.user?.id && (
            <div className="navbar-right" id="post-options">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="post-option-open"
                >
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu" id="post-option-menu">
                  <li><button type="button" onClick={() => setIsEditing(true)}>Modify</button></li>
                  <li><button type="button" onClick={handleDelete}>Destroy</button></li>
                </ul>
              </div>
            </div>
          )}
        </Flex>
      </div>

      <div>
        <Text id="post-body" size="4">{post.body}</Text>
      </div>

      {currentUser && (
        <Flex gap="1" mt="3">
          <Button
            variant="soft"
            color="gray"
						disabled={!currentUser}
            onClick={handleLike}
            className="flex items-center justify-center gap-1"
          >
            <HeartIcon width="15" height="15" style={{ display: 'flex', alignItems: 'center' }} />
            <Text style={{ display: 'flex', alignItems: 'center' }}>
							{ post.likes_count || 0 }
						</Text>
          </Button>
          <Button
            variant="soft"
            color="gray"
						disabled={!currentUser}
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center justify-center gap-1"
          >
            <ChatBubbleIcon width="15" height="15" style={{ display: 'flex', alignItems: 'center' }} />
            <Text style={{ display: 'flex', alignItems: 'center' }}>
              { post.comment_count || 0 }
            </Text>
          </Button>
        </Flex>
      )}

      {showCommentForm && (
        <Box mt="2" p="3" style={{ backgroundColor: 'var(--gray-2)' }} className="rounded-lg">
          <Flex gap="2" align="center" mb="2">
            <Avatar
              size="2"
              fallback="U"
              radius="full"
              src={getAvatarUrl(currentUser)}
              alt={currentUser.name}
            />
            <Text size="2" color="gray">Add a comment...</Text>
          </Flex>
          <CommentForm postId={post.id} />
        </Box>
      )}

      <div>
        <CommentList comments={post.comments} />
      </div>
		</Card>
  )
}

export default Post
