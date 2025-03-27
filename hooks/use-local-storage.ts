"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Create a state variable that will hold our value
  // Initialize it to initialValue
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Only attempt to get from localStorage after component has mounted
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Get from localStorage
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key)
        // Parse stored json or if none return initialValue
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      }
    } catch (error) {
      console.error("Error reading from localStorage", error)
    }
  }, [key])

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Save state
      setStoredValue(valueToStore)

      // Save to localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error("Error writing to localStorage", error)
    }
  }

  return [storedValue, setValue]
}

