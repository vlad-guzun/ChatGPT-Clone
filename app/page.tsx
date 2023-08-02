'use client'

import React, { useLayoutEffect, useRef } from 'react';
import Textarea from 'react-textarea-autosize';
import { IoMdSend } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { CiMicrochip } from 'react-icons/ci';
import { useChat } from 'ai/react';
import { AiFillGithub } from 'react-icons/ai';
import Link from 'next/link';
import { AiOutlineArrowDown } from 'react-icons/ai';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api',
  });

  const messageEndRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scroll = () => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };
    scroll();
  }, [messages]);

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='flex items-center'>
        <Link href='https://github.com/vlad-guzun'>
          <h1 className='text-5xl flex items-center'>
            <AiFillGithub /> /vlad-guzun
          </h1>
        </Link>
      </div>
      <p className='text-sm font-bold mt-1'>I have exceeded my current quota 😥(free tier) so the requests will not work, but you can always just create your api key, paste in .env and make it work</p>
      <div className='h-full px-5 pt-5 overflow-y-scroll'>
        {messages.length === 0 ? (
          <div className='text-bold flex justify-center h-full items-center'>
            <div className='flex flex-col justify-center items-end'>
              <h1 className='text-3xl'>Say something to AI</h1>
              <AiOutlineArrowDown />
            </div>
          </div>
        ) : (
          <div>
            {messages.map((message, index) => (
              <div key={message.id} className={`w-full ${index !== 0 ? 'mt-3' : ''}`}>
                {message.role === 'user' ? (
                  <div className='flex gap-x-2'>
                    <div className='flex items-center justify-center rounded-lg h-12 w-12'>
                      <CgProfile className='text-3xl' />
                    </div>
                    <div className='p-3 w-full text-sm border-2 border-blue-900'>
                      <p>
                        <b>{message.content}</b>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='flex gap-x-2'>
                    <div className='flex items-center justify-center rounded-lg h-12 w-12'>
                      <CiMicrochip className='text-3xl' />
                    </div>
                    <div className='p-3 w-full text-sm border-2 border-pink-700'>
                      <p>
                        <b>{message.content}</b>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div ref={messageEndRef}></div>
        <form
          onSubmit={handleSubmit}
          className='flex items-center p-3 fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-800'
        >
          <Textarea
            tabIndex={0}
            required
            rows={1}
            value={input}
            onChange={handleInputChange}
            spellCheck={false}
            className='flex-1 focus:outline-none placeholder-gray-400 text-white p-3 bg-neutral-800 rounded-lg'
            placeholder='Type your message...'
          />
          <button type='submit' className='ml-3 p-2 bg-green-600 rounded-full focus:outline-none'>
            <IoMdSend className='text-white text-lg' />
          </button>
        </form>
      </div>
    </div>
  );
}
