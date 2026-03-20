'use client'

import React from 'react'

interface AtlasLogoProps {
  className?: string
  color?: string
  strokeWidth?: number
}

export default function AtlasLogo({ 
  className = "w-8 h-8", 
  color = "currentColor",
  strokeWidth = 32
}: AtlasLogoProps) {
  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Outer Circle */}
      <circle 
        cx="256" 
        cy="256" 
        r="220" 
        stroke={color} 
        strokeWidth={strokeWidth}
      />
      {/* The "A" Shape */}
      {/* Based on the provided minimalist design: 
          Slanted lines meeting at peak, horizontal bar in middle */}
      <path 
        d="M130 410L256 102L382 410" 
        stroke={color} 
        strokeWidth={strokeWidth + 8} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M185 300H327" 
        stroke={color} 
        strokeWidth={strokeWidth + 8} 
        strokeLinecap="round"
      />
    </svg>
  )
}
