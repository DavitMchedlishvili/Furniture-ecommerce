import React from 'react'
import { getPosts } from '../../hooks/getPosts'

export const PostsPage = async () => {


    const postData = await getPosts()

    console.log(postData)

  return (
    <div>page</div>
  )
}


export default PostsPage