import React, { useState, useEffect } from 'react'
import ZuckerLayout from '../components/Layout/ZuckerLayout'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import MessageBox from '../components/MessageBox'

const Zuckerbook = () => {
  return (
		<ZuckerLayout>
			<div className="container">
				{/* <PostForm /> */}
				<PostList />
			</div>
			<MessageBox />
		</ZuckerLayout>
  )
}

export default Zuckerbook
