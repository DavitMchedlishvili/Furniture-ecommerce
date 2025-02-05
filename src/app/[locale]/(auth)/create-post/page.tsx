
import React from 'react'
import CreatePostForm from '../../components/CreatePostsForm/CreatePostsForm'




const CreatePost =() => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
    <div className="w-full max-w-3xl mt-[90px] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800 max-h-[800px] overflow-y-auto scrollbar">
      <h2 className="text-2xl font-bold text-center dark:text-black text-gray-700 mb-6">
        Create Post
      </h2>
      <CreatePostForm/>
    </div>
    </div>
  )
}

export default CreatePost