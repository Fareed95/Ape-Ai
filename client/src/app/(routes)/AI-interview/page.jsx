'use client'
import React, { useState, useRef, useEffect } from 'react'
import Orb from '../../../components/orb'

export default function Page() {
  const [transcript, setTranscript] = useState('')
  const [Response, setResponse] = useState('')
  const [Listening, setListening] = useState(false)
  const [QID, setQID] = useState(null)
  const [ended, setEnded] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isFirstRequest, setIsFirstRequest] = useState(true)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const silenceTimeoutRef = useRef(null)
  const isRecordingRef = useRef(false)

  const sendData = (answerText = null) => {
    const token = localStorage.getItem("auth_token")

    let payload = { internship_id: 1 }

     if (QID !== null && answerText) {
      payload.question_id = QID
      payload.answer = answerText
    }

    fetch("https://bot-ape.crodlin.in/api/interviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-app": "literacyprojectnamesasapi#2501@called",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.question)
        if (data.end) {
          setEnded(true)
          console.log("Interview Ended")
        } else {
          setQID(data.question_id)
        }
        console.log("API Response:", data)
      })
      .catch((err) => console.error("Error:", err))
  }

  const startRecording = async () => {
    if (isRecordingRef.current || ended || isSpeaking) return
    isRecordingRef.current = true
    setListening(true)

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    audioChunksRef.current = []

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    analyserRef.current = audioContextRef.current.createAnalyser()
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)
    sourceRef.current.connect(analyserRef.current)
    analyserRef.current.fftSize = 512
    const dataArray = new Uint8Array(analyserRef.current.fftSize)

    const checkSilence = () => {
      if (!analyserRef.current || !isRecordingRef.current) return
      analyserRef.current.getByteTimeDomainData(dataArray)
      const volume = dataArray.reduce((a, b) => a + Math.abs(b - 128), 0) / dataArray.length
      if (volume > 10) {
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current)
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
      setListening(false)

      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      audioChunksRef.current = []

      try {
        const formData = new FormData()
        formData.append('file', audioBlob, 'audio.webm')

        const res = await fetch('http://localhost:8000/api/transcribe/', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        setTranscript(data.text)

        // send answer
        sendData(data.text)
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

  useEffect(() => {
    if (!Response ) return
    
    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(Response)
    utterance.lang = 'en-US'
    utterance.rate = 1
    utterance.pitch = 1
    
    utterance.onstart = () => {
      setListening(false)
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      if (!ended) {
        console.log("Finished speaking, start listening...")
        startRecording()
      }
    }

    window.speechSynthesis.speak(utterance)
    console.log("Response spoken:", Response)
    
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [Response])

  useEffect(() => {
    // Make the first API call on component mount
    if (isFirstRequest) {
      setIsFirstRequest(false)
      sendData() // This will trigger the first question
    }
  }, [])

  useEffect(() => {
    // Start recording only when not speaking and not ended
    if (!isSpeaking && !ended && !Listening && Response) {
      startRecording()
    }
    
    return () => {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current)
      if (audioContextRef.current) audioContextRef.current.close()
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [isSpeaking, ended])

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-4 mt-[8vh]">
      {ended ? (
        <div className="text-yellow-500 font-bold">Interview Ended </div>
      ) : Listening ? (
        <div className="text-green-600 font-bold">Listening ...</div>
      ) : isSpeaking ? (
        <div className="text-red-600 font-bold">Speaking ...</div>
      ) : (
        <div className="text-blue-600 font-bold">Processing ...</div>
      )}
      <Orb heightVh={70} />
      <div className="text-white text-lg text-center max-w-xl px-4">
        {transcript || (Listening ? "Listening..." : isSpeaking ? "Speaking..." : Response ? "Processing..." : "Starting interview...")}
      </div>
    </div>
  )
}