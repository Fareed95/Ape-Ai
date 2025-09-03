'use client'
import React, { useState, useRef, useEffect } from 'react'
import Orb from '../../../components/orb'

export default function Page() {
  const [transcript, setTranscript] = useState('')
  const [Response, setResponse] = useState('Hello! Type something to hear it.')

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const silenceTimeoutRef = useRef(null)
  const isRecordingRef = useRef(false)

  const startRecording = async () => {
    if (isRecordingRef.current) return
    isRecordingRef.current = true

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    audioChunksRef.current = []

    // Setup audio context for silence detection
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    analyserRef.current = audioContextRef.current.createAnalyser()
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)
    sourceRef.current.connect(analyserRef.current)
    analyserRef.current.fftSize = 512
    const dataArray = new Uint8Array(analyserRef.current.fftSize)

    const checkSilence = () => {
      analyserRef.current.getByteTimeDomainData(dataArray)
      const volume = dataArray.reduce((a, b) => a + Math.abs(b - 128), 0) / dataArray.length
      if (volume > 10) {
        clearTimeout(silenceTimeoutRef.current)
        silenceTimeoutRef.current = setTimeout(stopRecording, 1500)
      }
      requestAnimationFrame(checkSilence)
    }
    requestAnimationFrame(checkSilence)

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data)
    }

    mediaRecorderRef.current.onstop = async () => {
      isRecordingRef.current = false
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      audioChunksRef.current = []

      // Send interview request
      const senddata = () => {
        const token = localStorage.getItem("auth_token")
        console.log(`Token: ${token}`)

        fetch("http://localhost:8000/api/interviews/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-app": "literacyprojectnamesasapi#2501@called",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ internship_id: 1 }),
        })
          .then((res) => res.json())
        //   .then((data) => setResponse(data.message))
        
          .catch((err) => console.error("Error:", err))
      }

      senddata()
      console.log("Audio captured")
      
      try {
        const formData = new FormData()
        formData.append('file', audioBlob, 'audio.webm')

        const res = await fetch('http://localhost:8000/api/transcribe/', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        setTranscript(data.text)

        startRecording()
        console.log("Transcription received")
        setResponse(transcript)

      } catch (err) {
        console.error('Error sending audio:', err)
      }
    }

    mediaRecorderRef.current.start()

  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }
  // Speak the response
  useEffect(() => {
    
    const utterance = new SpeechSynthesisUtterance(Response)
    utterance.lang = 'en-US'
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
    console.log("Response spoken:", Response)
    
    
  }, [Response,transcript])

  // Start recording on mount
  useEffect(() => {
    startRecording()
    return () => {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }

    }
    
  }, [])

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-4">
      <Orb heightVh={70} />
      <div className="text-white text-lg text-center max-w-xl px-4">
        {transcript || "Listening..."}
      </div>
    </div>
  )
}
