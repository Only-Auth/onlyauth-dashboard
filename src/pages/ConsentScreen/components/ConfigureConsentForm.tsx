import { useForm } from 'react-hook-form'
// import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { ConsentScreen, UpdatedAppDetails } from '@/types/types'
import { Label } from '@radix-ui/react-label'
// import LogoPlaceholder from '@/assets/logo-placeholder.jpg'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'

type FormValues = {
  name: string
  title: string
  description: string
  logo: string | null
  email: string
  address: string
  message: string
}

function ConfigureConsentForm({
  appData,
  onSave,
  loading,
}: {
  appData: ConsentScreen
  loading: boolean
  onSave: (data: UpdatedAppDetails) => void
}) {
  const {
    register,
    formState: { isDirty, errors, dirtyFields },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      name: appData.name,
      title: appData.title,
      description: appData.decription || '',
      email: appData.developerEmail,
      address: appData.appAddress,
      message: appData.message || '',
      logo: appData.logo || '',
    },
  })

  // const [img, setImg] = useState<{
  //   src: string | null
  //   file: File | null
  // }>({
  //   src: appData.logo,
  //   file: null,
  // })

  // useEffect(() => {
  //   formStateHandler(isDirty || isImageFieldDirty())
  // }, [isDirty, img])

  // function isImageFieldDirty() {
  //   return img.src !== appData.logo
  // }

  function submitHandler(data: FormValues) {
    if (!isDirty) {
      console.log('No changes made')
      return
    }
    const updatedData: UpdatedAppDetails = {
      consentScreen: {},
    }
    if (dirtyFields.logo) {
      updatedData.consentScreen!.logo = data.logo
    }
    if (dirtyFields.address) {
      updatedData.consentScreen!.appAddress = data.address
    }
    if (dirtyFields.email) {
      updatedData.consentScreen!.developerEmail = data.email
    }
    if (dirtyFields.message) {
      updatedData.consentScreen!.message = data.message
    }
    if (dirtyFields.title) {
      updatedData.consentScreen!.title = data.title
    }

    onSave(updatedData)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col mt-10 gap-y-4">
        <h1 className="text-xl">App Info :</h1>
        <div className="pl-2 mb-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="appname">
              Name
            </Label>
            <Input
              type="text"
              id="appname"
              placeholder="Dummy"
              disabled
              {...register('name', { required: 'App name cannot be empty' })}
            />
            <p>{errors.name?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="icon">
              Icon Url
            </Label>
            <Input
              placeholder="http://via.placeholder.com/1280x720"
              {...register('logo', {
                pattern: {
                  value: /^(http|https):\/\/[^ "]+$/,
                  message: 'Invalid URL!',
                },
              })}
            />
            <p className="text-red-500 text-xs">{errors.logo?.message}</p>
          </div>
          {/* <div className="grid w-full max-w-sm items-center gap-1.5">
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
          </div> */}
        </div>
        <h1 className="text-xl">Developer Info :</h1>
        <div className="pl-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="email">
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
            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="address">
              App Address<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="text"
              id="address"
              placeholder="awesomedummy.com"
              {...register('address', {
                required: 'Address cannot be empty',
                pattern: {
                  value: /^(https?:\/\/[^\s/$.?#].[^\s]*)$/,
                  message: 'Invalid app address.',
                },
              })}
            />
            <p className="text-red-500 text-xs">{errors.address?.message}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label className="font-semibold" htmlFor="message">
              Message
            </Label>
            <Input
              type="text"
              id="message"
              placeholder="Display message here"
              {...register('message')}
            />
          </div>
          <div className="grid w-full max-w-sm items-center justify-end gap-1.5 my-4">
            <Button
              className="bg-blue-600 w-max"
              disabled={!isDirty || loading}
            >
              {loading ? <Loader /> : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ConfigureConsentForm
