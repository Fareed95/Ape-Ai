'use client'
import React, { useState } from 'react'

export default function Page() {
  const [transcript, setTranscript] = useState('')
  const [listening, setListening] = useState(false)

  let recognition

  if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setListening(true)
    }

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      setListening(false)
    }

    recognition.onerror = () => {
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }
  }

  const startListening = () => {
    if (recognition) recognition.start()
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 text-white">
      <h1 className="text-xl font-bold">Speech to Text Demo</h1>

      <button
        onClick={startListening}
        className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {listening ? 'Listening...' : 'Start Talking'}
      </button>

      <p className="mt-4 text-lg">{transcript || 'Say something...'}</p>
    </div>
  )
}
