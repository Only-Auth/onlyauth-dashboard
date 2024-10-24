import { useState } from 'react'
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import { signIn, signUp } from '@/services/AuthServices'
import { useToast } from './use-toast'

export function useAuth() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const from = location.state?.from?.pathname || '/credentials'

  function isAuthenticated() {
    if (Cookies.get('oa_db_token')) {
      return true
    }
    return false
  }

  async function handleSignIn({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    setLoading(true)
    try {
      const response = await signIn({ email, password })

      Cookies.set('oa_db_token', response.accessToken)
      setError(null)

      toast({
        description: 'Login Successful!',
      })
      navigate(from, { replace: true })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignUp({
    email,
    password,
    name,
  }: {
    email: string
    password: string
    name: string
  }) {
    setLoading(true)
    try {
      const response = await signUp({ email, password, name })

      Cookies.set('oa_db_token', response.accessToken)
      setError(null)

      navigate(from, { replace: true })
      toast({
        description: 'Signup Successful!',
      })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogOut() {
    Cookies.remove('oa_db_token')
    navigate('/login')
    toast({
      description: 'Logged out successfully!',
    })
  }

  return {
    loading,
    error,
    handleSignIn,
    handleSignUp,
    handleLogOut,
    isAuthenticated,
  }
}
