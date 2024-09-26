import axios from 'axios'

const API_URL = import.meta.env.BASE_API_URL || 'http://localhost:8000'

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
