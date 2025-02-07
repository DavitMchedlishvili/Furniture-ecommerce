"use client";

import { sendEmail } from '@/utils/sendEmail/send-email';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import SubmitButton from '../Buttons/SubmitButton';
import { useTranslations } from 'next-intl';

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const t = useTranslations("Contact"); 

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <div className='w-full text-center max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800 mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5'>
          <label
            htmlFor='name'
            className='mb-3 block text-start font-medium text-black'
          >
            {t("FullName")} 
          </label>
          <input
            type='text'
            placeholder={t("FullNamePlaceholder")} 
            className='w-full p-2 mt-4 border border-black dark:bg-slate-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-black'
            {...register('name', { required: true })}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='mb-3 block text-start font-medium text-black'
          >
            {t("EmailAddress")} 
          </label>
          <input
            type='email'
            placeholder={t("EmailPlaceholder")}
            className='w-full p-2 mt-4 border border-black dark:bg-slate-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-black'
            {...register('email', { required: true })}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='message'
            className='mb-3 block text-start font-medium text-black'
          >
            {t("Message")}
          </label>
          <textarea
            rows={4}
            placeholder={t("MessagePlaceholder")}
            className='w-full p-2 mt-4 border border-black dark:bg-slate-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-black'
            {...register('message', { required: true })}
          ></textarea>
        </div>
        <div>
          <SubmitButton text={t("SubmitButton")} />
        </div>
      </form>
    </div>
  );
};

export default Contact;
