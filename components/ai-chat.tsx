"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Send, Bot, User, Copy, Check } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 rounded-t-lg border-b border-border/50">
        <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </Button>
      </div>
      <pre className="bg-muted/80 p-4 rounded-b-lg overflow-x-auto border border-t-0 border-border/50 max-w-full">
        <code className="text-sm font-mono text-foreground leading-relaxed break-words">{code}</code>
      </pre>
    </div>
  )
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const parseMessageContent = (content: string) => {
    const parts: Array<{ type: "text" | "code"; content: string; language?: string }> = []
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: content.slice(lastIndex, match.index) })
      }
      parts.push({
        type: "code",
        content: match[2],
        language: match[1] || "javascript",
      })
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < content.length) {
      parts.push({ type: "text", content: content.slice(lastIndex) })
    }

    return parts.length > 0 ? parts : [{ type: "text", content }]
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("https://open-ai21.p.rapidapi.com/chatgpt", {
        method: "POST",
        headers: {
          "x-rapidapi-key": "806c689a62msh720d3fe20af8ed8p152e58jsn536f89263103",
          "x-rapidapi-host": "open-ai21.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            { role: "user", content: input },
          ],
          web_access: false,
        }),
      })

      const data = await response.json()
      const assistantMessage: Message = {
        role: "assistant",
        content: data.result || data.message || "Sorry, I couldn't generate a response.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] AI API Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error connecting to the AI service. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-300px)] min-h-[400px] max-h-[700px] gap-3 sm:gap-4">
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 sm:pr-4 scroll-smooth scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8 sm:py-12">
            <Bot className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 text-primary animate-pulse" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-primary">AI Assistant Ready</h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
              Ask me anything about algorithms, code, or get help with your programming questions!
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 sm:gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                )}
                <Card
                  className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] min-w-0 p-3 sm:p-4 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border-primary/20"
                  }`}
                >
                  <div className="space-y-3 break-words overflow-hidden">
                    {parseMessageContent(message.content).map((part, partIndex) => {
                      if (part.type === "code") {
                        return (
                          <CodeBlock key={partIndex} code={part.content} language={part.language || "javascript"} />
                        )
                      }
                      return (
                        <p
                          key={partIndex}
                          className={`text-sm md:text-base whitespace-pre-wrap leading-relaxed break-words overflow-wrap-anywhere ${
                            message.role === "user" ? "text-primary-foreground" : "text-foreground"
                          }`}
                        >
                          {part.content}
                        </p>
                      )
                    })}
                  </div>
                </Card>
                {message.role === "user" && (
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <Card className="max-w-[85%] md:max-w-[75%] p-4 bg-card border-primary/20">
                  <div className="flex items-center gap-2">
                    <Spinner className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 min-h-[50px] sm:min-h-[60px] md:min-h-[80px] max-h-[120px] text-sm sm:text-base resize-none bg-card border-primary/20 focus:border-primary transition-all touch-manipulation"
          disabled={isLoading}
        />
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          size="lg"
          className="px-4 sm:px-6 h-[50px] sm:h-auto transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
        >
          {isLoading ? <Spinner className="w-4 h-4 sm:w-5 sm:h-5" /> : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
        </Button>
      </div>
    </div>
  )
}
