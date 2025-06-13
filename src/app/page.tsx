"use client";
import React from 'react';
import { Inter } from 'next/font/google'
import { Navbar } from "../components/ui/Navbar";
import { Banniere } from "../components/ui/banniere";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Banniere/>
    </div>
  );
}
  
