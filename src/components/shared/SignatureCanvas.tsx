'use client'

import React, { useRef, useEffect } from 'react'

interface SignatureCanvasProps {
  value?: string
  onChange: (signature: string) => void
  width?: number
  height?: number
  label?: string
}

export function SignatureCanvas({
  value,
  onChange,
  width = 400,
  height = 120,
  label = 'Signature',
}: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)

  // Load existing signature if value exists
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !value) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
    img.src = value
  }, [value])

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    } else {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      }
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    isDrawing.current = true
    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  const endDrawing = () => {
    if (!isDrawing.current) return
    isDrawing.current = false

    const canvas = canvasRef.current
    if (canvas) {
      onChange(canvas.toDataURL())
    }
  }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      onChange('')
    }
  }

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      <div className="border border-gray-300 rounded bg-white">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
      </div>
      <button
        type="button"
        onClick={clear}
        className="text-sm text-red-600 hover:text-red-700"
      >
        Clear Signature
      </button>
    </div>
  )
}
