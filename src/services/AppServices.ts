import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = import.meta.env.BASE_API_URL || 'http://localhost:8000'

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
