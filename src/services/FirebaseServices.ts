import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '@/firebase'

async function handleUpload(file: File, appName: string, userId: string) {
  const storageRef = ref(storage, userId)
  const fileRef = ref(storageRef, appName)

  try {
    await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(fileRef)
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}

export { handleUpload }
