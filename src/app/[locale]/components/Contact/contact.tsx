'use client';

import { sendEmail } from '@/utils/sendEmail/send-email';
// import { Input } from 'postcss';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '../Buttons/SubmitButton';


export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <div className='w-full text-center max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800'>
<form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-5'>
        <label
          htmlFor='name'
          className='mb-3 block text-start font-medium text-black'
        >
          Full Name
        </label>
        <input
          type='text'
          placeholder='Full Name'
          className='w-full p-2 mt-4 border border-black  dark:bg-slate-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-black'
          {...register('name', { required: true })}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='email'
          className='mb-3 block text-start font-medium text-black'
        >
          Email Address
        </label>
        <input
          type='email'
          placeholder='example@domain.com'
          className='w-full p-2 mt-4 border border-black  dark:bg-slate-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-black'
          {...register('email', { required: true })}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='message'
          className='mb-3 block text-start font-medium text-black'
        >
          Message
        </label>
        <textarea
          rows={4}
          placeholder='Type your message'
          className='w-full p-2 mt-4 border border-black  dark:bg-slate-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-black'
          {...register('message', { required: true })}
        ></textarea>
      </div>
      <div>
        <SubmitButton text={"Submit"}/>
      </div>
    </form>
    </div>
    
  );
};

export default Contact;