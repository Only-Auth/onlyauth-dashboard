import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import LogoPlaceholder from '@/assets/logo-placeholder.jpg'
import { Button } from '@/components/ui/button'

type FormValues = {
  title: string
  description: string
  email: string
  address: string
  message: string
}

function ConsentDetails({
  onSubmit,
  handleBack
}: {
  onSubmit: (data: FormValues) => void
  handleBack: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const [img, setImg] = useState<{
    src: string | null
    file: File | null
  }>({
    src: null,
    file: null,
  })

  function submitHandler(data: FormValues) {
    console.log(data)
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
        <div className="pl-2 mb-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="appname">
              Title<span className="text-red-600"> *</span>
            </Label>
            <Input
              type="text"
              id="apptitle"
              placeholder="Dummy"
              {...register('title', { required: 'App title cannot be empty' })}
            />
            <p>{errors.title?.message}</p>
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
        <div className="p-2">
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
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={handleBack} variant="secondary">
              Back
            </Button>
            <Button
              className="bg-blue-600 
            "
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ConsentDetails
