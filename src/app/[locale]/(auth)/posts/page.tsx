import React from 'react'
import { getPosts } from '../../hooks/getPosts'
import PostCard from '../../components/PostCard/PostCard'

 const PostsPage = async () => {


    const postData = await getPosts();

    console.log(postData)

  return (
    <div className='flex flex-col  items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700' >
         <div className=' mt-24  flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 '>
    
    {postData.data.length === 0 ? (
      <div className="text-center py-8">Sorry, there are no products.</div>
    ) : (
     

      <div className='overflow-hidden scrollbar flex flex-col gap-6 w-full  p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-100 dark:border-slate-800'>

        
        {postData.data.map((post) => (
          <PostCard key={post.id} post={post}/>
        ))}
      </div>
      
    )}
  </div>
    </div>
   
  )
}


export default PostsPage