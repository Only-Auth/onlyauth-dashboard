import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { ConsentScreen } from '@/types/types'
import { Label } from '@radix-ui/react-label'
import LogoPlaceholder from '@/assets/logo-placeholder.jpg'
import { Button } from '@/components/ui/button'

type FormValues = {
  name: string
  title: string
  description: string
  email: string
  address: string
  message: string
}

function ConfigureConsentForm({
  appData,
  formStateHandler,
}: {
  appData: ConsentScreen
  formStateHandler: (value: boolean) => void
}) {
  const {
    register,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      name: appData.name,
      title: appData.title,
      description: appData.decription || '',
      email: appData.developerEmail,
      address: appData.appAddress,
      message: appData.message || '',
    },
  })
  const [img, setImg] = useState<{
    src: string | null
    file: File | null
  }>({
    src: appData.logo,
    file: null,
  })

  useEffect(() => {
    formStateHandler(isDirty || isImageFieldDirty())
  }, [isDirty, img])

  function isImageFieldDirty() {
    return img.src !== appData.logo
  }

  function submitHandler(data: FormValues) {
    const updatedConsentScreenData = {
      ...appData,
      name: data.name,
      title: data.title,
      description: data.description,
      developerEmail: data.email,
      appAddress: data.address,
      message: data.message,
      logo: img.file ? URL.createObjectURL(img.file) : appData.logo,
    }

    console.log(updatedConsentScreenData)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col mt-10 gap-y-4">
        <h1 className="text-xl">App Info :</h1>
        <div className="pl-2 mb-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="appname">
              Name<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="text"
              id="appname"
              placeholder="Dummy"
              {...register('name', { required: 'App name cannot be empty' })}
            />
            <p>{errors.name?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="appicon">Icon</Label>
            <div className="flex items-center gap-2 border-1 rounded-md shadow-sm">
              <img
                className="w-[40%] aspect-square object-cover rounded-tl-md rounded-bl-md"
                src={img.src ?? LogoPlaceholder}
              />
              <Input
                className="bg-transparent shadow-none border-none cursor-pointer"
                id="appicon"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.length === 0) {
                    setImg({
                      file: null,
                      src: null,
                    })
                    return
                  }
                  setImg({
                    file: e.target.files ? e.target.files[0] : null,
                    src: e.target.files
                      ? URL.createObjectURL(e.target.files?.[0])
                      : null,
                  })
                }}
              />
            </div>
          </div>
        </div>
        <h1 className="text-xl">Developer Info :</h1>
        <div className="pl-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="email">
              Email<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="example@email.com"
              {...register('email', {
                required: 'Email cannot be empty',
                pattern: {
                  value: /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="address">
              App Address<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="text"
              id="address"
              placeholder="awesomedummy.com"
              {...register('address', {
                required: 'Address cannot be empty',
              })}
            />
            <p>{errors.address?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="message">Message</Label>
            <Input
              type="text"
              id="message"
              placeholder="Display message here"
              {...register('message')}
            />
          </div>
          <Button
            className="bg-blue-600 
          "
            disabled={!isDirty && !isImageFieldDirty()}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ConfigureConsentForm
