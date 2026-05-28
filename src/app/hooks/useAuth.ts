"use client"

import {

  useEffect,

  useState,

} from "react"

import {

  useRouter,

} from "next/navigation"

export default function useAuth() {

  const router =
    useRouter()

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    user,
    setUser,
  ] = useState<any>(null)

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "user"
      )

    if (!storedUser) {

      router.push(
        "/login"
      )

      return
    }

    setUser(
      JSON.parse(
        storedUser
      )
    )

    setLoading(false)

  }, [])

  return {

    user,

    loading,
  }
}