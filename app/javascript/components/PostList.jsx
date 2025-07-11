import React from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { PostsAPI } from '../services/api'
import Post from './Post'
import NoticeBox from './NoticeBox'
import { Flex, Box, Text } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './LoadingSpinner'

const PostList = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const searchKey = searchParams.get("key") || ""

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts", searchKey],
    queryFn: () => PostsAPI.list({ key: searchKey.trim() || undefined }),
    staleTime: 5 * 60 * 1000,
    enabled: true,
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Box p="4" style={{ textAlign: 'center' }}>
        <Text color="red">Failed to fetch posts</Text>
      </Box>
    )
  }

  return (
		<Box className="py-5">
      <NoticeBox />

      <Flex direction="column" gap="5" className="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3" id="posts-all">
        {
					posts && posts.length > 0 ? (
						posts.map(post => (
							<Post key={post.id} post={post} />
						))
					) : (
						<div className="jumbotron text-center">
							<h1>Sorry, no results found!</h1>
							<h2>Maybe try other keywords?</h2>
							<br />
						</div>
						// <Box p="4" style={{ textAlign: 'center' }}>
						// 	<Text size="6" weight="bold">Sorry, no results found!</Text>
						// 	<Text size="3" color="gray">Maybe try other keywords?</Text>
						// </Box>
					)
				}
      </Flex>
		</Box>
	)
}

export default PostList
