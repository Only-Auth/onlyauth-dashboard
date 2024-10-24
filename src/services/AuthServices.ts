import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000'

export async function getUserId() {
  const token = Cookies.get('oa_db_token')
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    if (response.status !== 200 || !response.data) {
      throw new Error(response.data.error || 'Failed to fetch user')
    }
    return response.data.id
  } catch (e: any) {
    throw new Error(e.response?.data?.error || 'Failed to fetch user')
  }
}

export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const payload = {
    email,
    password,
  }

  try {
    const response = await axios.post(`${API_URL}/user/login`, payload)

    if (response.status !== 200 || !response.data) {
      throw new Error(response.data.error || 'Login failed')
    }

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed')
  }
}

export async function signUp({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}) {
  const payload = {
    fullName: name,
    email: email,
    password: password,
  }

  try {
    const response = await axios.post(`${API_URL}/user/signup`, payload)

    if (response.status !== 201 || !response.data) {
      throw new Error(response.data?.error || 'Signup failed')
    }

    return response.data
  } catch (e: any) {
    console.log(e)
    throw new Error(e.response?.data?.error || 'Signup failed')
  }
}
