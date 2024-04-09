import Presentes from '@/components/organismo/header';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React, { createContext, useEffect, useRef } from 'react';


export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <Image
        src="/whats.png"
        alt="Vercel Logo"
        className="white:invert mb-14"
        width={100}
        height={24}
        priority
      />
      <Presentes></Presentes>
    </div>
  );
};