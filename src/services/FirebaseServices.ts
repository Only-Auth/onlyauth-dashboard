import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '@/firebase'

const storageRef = ref(storage, 'icons')

async function handleUpload(file: File) {
  const fileRef = ref(storageRef, `icons/${file.name}`)

  try {
    await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(fileRef)
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
  }
}

export { handleUpload }
