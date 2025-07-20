"use client"

import { useState, useRef, useCallback } from "react"
import { Volume2, VolumeX, Pause, Play } from "lucide-react"

interface VoiceAssistantProps {
  text: string
  className?: string
}

const VoiceAssistant = ({ text, className = "" }: VoiceAssistantProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback(() => {
    if ("speechSynthesis" in window) {
      // Arrêter toute lecture en cours
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "fr-FR"
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => {
        setIsPlaying(true)
        setIsPaused(false)
      }

      utterance.onend = () => {
        setIsPlaying(false)
        setIsPaused(false)
      }

      utterance.onerror = (error) => {
        console.error("Erreur de synthèse vocale:", error)
        setIsPlaying(false)
        setIsPaused(false)
      }

      utterance.onpause = () => {
        setIsPaused(true)
      }

      utterance.onresume = () => {
        setIsPaused(false)
      }

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    } else {
      alert("La synthèse vocale n'est pas supportée par votre navigateur")
    }
  }, [text])

  const pause = useCallback(() => {
    if (window.speechSynthesis && isPlaying) {
      window.speechSynthesis.pause()
    }
  }, [isPlaying])

  const resume = useCallback(() => {
    if (window.speechSynthesis && isPaused) {
      window.speechSynthesis.resume()
    }
  }, [isPaused])

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      setIsPaused(false)
    }
  }, [])

  const handleClick = () => {
    if (!isPlaying && !isPaused) {
      speak()
    } else if (isPlaying && !isPaused) {
      pause()
    } else if (isPaused) {
      resume()
    }
  }

  if (!text || text.trim() === "") {
    return null
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleClick}
        className={`p-2 rounded-lg transition-all ${
          isPlaying
            ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        title={isPlaying && !isPaused ? "Mettre en pause" : isPaused ? "Reprendre la lecture" : "Lire le message"}
        aria-label={isPlaying && !isPaused ? "Mettre en pause" : isPaused ? "Reprendre la lecture" : "Lire le message"}
      >
        {isPlaying && !isPaused ? (
          <Pause className="w-4 h-4" />
        ) : isPaused ? (
          <Play className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>

      {isPlaying && (
        <button
          onClick={stop}
          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
          title="Arrêter la lecture"
          aria-label="Arrêter la lecture"
        >
          <VolumeX className="w-4 h-4" />
        </button>
      )}

      {isPlaying && (
        <div className="flex items-center gap-1">
          <div className="w-1 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="w-1 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-1 h-4 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-1 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
        </div>
      )}
    </div>
  )
}

export default VoiceAssistant