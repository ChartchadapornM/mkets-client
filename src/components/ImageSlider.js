'use client'
import React, { useState, useEffect } from 'react'

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const slides = [
    {
      id: 1,
      image: 'https://placehold.co/600x400',
    },
    {
      id: 2,
      image: 'https://placehold.co/600x400',
    },
    {
      id: 3,
      image: 'https://placehold.co/600x400',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  if (!mounted) {
    return <div className="relative w-full h-96 md:h-120 bg-gray-200"></div>
  }

  return (
    <div className="relative w-full overflow-hidden z-10">
      <div className="relative h-96 md:h-120">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: index === currentSlide ? 10 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
