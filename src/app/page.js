'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import ImageSlider from '@/components/ImageSlider'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow">
        {/* content here */}
        <ImageSlider />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Welcome to mkets</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
            justo ac nibh ultricies pretium. Proin quis diam vel tortor faucibus
            bibendum.
          </p>
        </div>
      </div>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 mkets. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
