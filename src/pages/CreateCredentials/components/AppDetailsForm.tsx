import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NewAppInfo } from '@/types/types'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'

type FormValues = {
  name: string
  redirectUri: string
  origins: {
    origin: string
  }[]
  newOrigin: string
}

function AppDetailsForm({
  defaultAppDetails,
  onSave,
}: {
  defaultAppDetails: NewAppInfo
  onSave: (data: FormValues) => void
}) {
  const [toggleAddOrigin, setToggleAddOrigin] = useState(false)

  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      name: defaultAppDetails.name,
      redirectUri: defaultAppDetails.redirectUri[0],
      origins: defaultAppDetails.origins.map((origin) => ({ origin })),
      newOrigin: '',
    },
  })

  const {
    fields: allowedOrigins,
    append: appendOrigin,
    remove: removeOrigin,
  } = useFieldArray({
    control,
    name: 'origins',
  })

  function handleAddOrigin() {
    setToggleAddOrigin((state) => !state)
  }

  const submitHandler = (data: FormValues) => {
    console.log(data)
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
        <Label className="font-semibold" htmlFor="name">
          App name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Dummy"
          {...register('name', {
            required: 'App name cannot be empty',
            minLength: {
              value: 3,
              message: 'App name must be at least 3 characters',
            },
          })}
        />
        <p className="text-gray-500 text-sm">
          The name of auth client. The name is only used to identify the client
        </p>
        <p className="text-red-500 text-xs">
          {errors.name && 'App name is required'}
        </p>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 pb-4">
        <Label className="font-semibold">Authorized JavaScript origins</Label>
        <div className="pb-2">
          {allowedOrigins.length === 0 && !toggleAddOrigin ? (
            <div className="text-center text-sm text-gray-500 p-2">
              No origins added
            </div>
          ) : (
            allowedOrigins.map((field, index) => (
              <div key={field.id} className="my-1">
                <p className="text-gray-500 text-sm  pb-1">
                  Origin {index + 1}
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    {...register(`origins.${index}.origin`, {
                      required: true,
                    })}
                  />

                  <MdDelete
                    onClick={() => {
                      removeOrigin(index)
                    }}
                    className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-600"
                    size={24}
                  />
                </div>
              </div>
            ))
          )}
        </div>
        {toggleAddOrigin ? (
          <div>
            <div className="my-1">
              <p className="text-gray-500 text-sm  pb-1">New Origin</p>
              <Input
                type="text"
                placeholder="http://localhost:3000"
                {...register('newOrigin', {
                  required: 'Origin is required',
                })}
              />
              <p>{errors?.newOrigin?.message}</p>
            </div>
            <div className="flex justify-end gap-2 py-2">
              <Button
                onClick={() => setToggleAddOrigin((state) => !state)}
                type="button"
                variant={'secondary'}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const newOriginValue = getValues('newOrigin')
                  if (newOriginValue.trim() === '') return
                  appendOrigin({ origin: newOriginValue })
                  setToggleAddOrigin((state) => !state)
                  setValue('newOrigin', '')
                }}
                type="button"
              >
                Add
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={handleAddOrigin} type="button">
            Add Origin
          </Button>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
        <Label className="font-semibold" htmlFor="name">
          Authorized Redirect Url<span className="text-red-500">*</span>
        </Label>
        <Input
          id="redirectUri"
          type="text"
          placeholder="http://localhost:3000"
          {...register('redirectUri', {
            required: 'Redirect uri cannot be empty!',
            pattern: {
              value: /^(https?:\/\/)/,
              message: 'Invalid URL',
            },
          })}
        />
        <p className="text-gray-500 text-sm">
          The URL to which the user will be redirected after granting permission
        </p>
        <p className="text-red-500 text-xs">
          {errors.redirectUri && errors.redirectUri.message}
        </p>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="w-[30%] rounded-lg bg-blue-600">
          Next
        </Button>
      </div>
    </form>
  )
}

export default AppDetailsForm
