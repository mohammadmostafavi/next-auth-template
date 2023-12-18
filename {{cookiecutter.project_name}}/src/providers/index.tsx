'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react'
import ReactQueryProvider from './ReactQueryProvider'

function Index({ children, }: { children: React.ReactNode, }) {

  return (
    <SessionProvider>
    <NextUIProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextUIProvider>
    </SessionProvider>
  );
}

export default Index;