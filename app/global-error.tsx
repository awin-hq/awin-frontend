"use client"

import { useEffect } from "react"

interface GlobalErrorProps {
  error: Error
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        An unexpected error occurred while loading the page.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-primary px-5 py-3 text-white hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  )
}
