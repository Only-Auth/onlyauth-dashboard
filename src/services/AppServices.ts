import { Application, UpdatedAppDetails } from '@/types/types'
import axios from 'axios'
import Cookies from 'js-cookie'
import { handleUpload } from './FirebaseServices'
import { getUserId } from './AuthServices'

const API_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000'

export async function getApplicationList() {
  const token = Cookies.get('oa_db_token')
  try {
    const response = await axios.get(`${API_URL}/dashboard/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status !== 200 || !response.data) {
      throw new Error(response.data.error || 'Failed to fetch applications')
    }

    return response.data.applications
  } catch (e: any) {
    console.log(e)
  }
}

export async function getApplicationDetails(appId: any) {
  if (!appId) throw new Error('Application ID is required')
  const applications: [] = await getApplicationList()
  const application: any = applications.find((app: any) => app.id === appId)
  return application
}

export async function createApplication({
  appData,
  file,
}: {
  appData: any
  file: File
}) {
  const userId = await getUserId()
  const downloadURL = await handleUpload(file, appData.name, userId)
  console.log('downloadURL', downloadURL)
  const payload = {
    name: appData.name,
    redirectUris: appData.redirectUri,
    allowedScopes: ['profile'],
    consentScreen: {
      name: appData.name,
      title: appData.title,
      logo: downloadURL,
      developerEmail: appData.developerEmail,
      appAddress: appData.appAddress,
    },
  }

  try {
    const response = await axios.post(`${API_URL}/dashboard/`, payload, {
      headers: {
        Authorization: `Bearer ${Cookies.get('oa_db_token')}`,
      },
    })

    console.log('response', response)

    if (response.status !== 200 || !response.data) {
      throw new Error(response.data.error || 'Failed to create application')
    }

    return response.data as Application
  } catch (e: any) {
    console.log(e)
    throw new Error(e.response.data.error || 'Failed to create application')
  }
}

export async function deleteApplication(appId: string) {
  const payload: Partial<Application> = {
    state: 'DELETED',
  }
  try {
    const response = await axios.post(
      `${API_URL}/dashboard/${appId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('oa_db_token')}`,
        },
      }
    )

    if (response.status !== 200 || !response.data) {
      throw new Error(response.data.error || 'Failed to delete application')
    }

    return response.data
  } catch (e: any) {
    console.log(e)
    throw new Error(e.response.data.error || 'Failed to create application')
  }
}

export async function updateApplication(
  {
    data,
    appName,
    file,
  }: {
    data: UpdatedAppDetails
    appName: string
    file?: File
  },
  appId: string
) {
  if (!appId) throw new Error('Application ID is required')

  if (data.consentScreen?.logo && file) {
    const userId = await getUserId()
    const downloadURL = await handleUpload(file, appName, userId)
    data.consentScreen.logo = downloadURL
  }
  try {
    const response = await axios.post(`${API_URL}/dashboard/${appId}`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('oa_db_token')}`,
      },
    })

    if (response.status !== 200 || !response.data) {
      throw new Error(response.data.error || 'Failed to update application')
    }

    return response.data
  } catch (e: any) {
    console.log(e)
    throw new Error(e.response.data.error || 'Failed to update application')
  }
}
