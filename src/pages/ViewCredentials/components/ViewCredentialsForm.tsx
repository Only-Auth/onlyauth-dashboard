import { useFieldArray, useForm } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'
import { useState } from 'react'

import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Application, UpdatedAppDetails } from '@/types/types'
import Loader from '@/components/Loader'

type FormValues = {
  name: string
  redirectUri: string
  origins: {
    origin: string
  }[]
  newOrigin: string
}

function ViewCredentialsForm({
  appData,
  onSave,
  loading,
}: {
  appData: Application
  onSave: (data: any, resetForm: (isSuccess: boolean) => void) => void
  loading: boolean
}) {
  const [toggleAddOrigin, setToggleAddOrigin] = useState(false)

  const {
    register,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors, dirtyFields },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      name: appData.name,
      redirectUri: appData.redirectUris[0],
      origins: appData.origins.map((origin: string) => ({ origin })),
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

  function isFormDirty() {
    if (loading) return true
    if (Object.keys(dirtyFields).length === 0) {
      return false
    } else if (dirtyFields.name || dirtyFields.redirectUri) {
      return true
    } else if (dirtyFields.origins) {
      return areOriginsDirty()
    }
  }
  function areOriginsDirty() {
    return JSON.stringify(allowedOrigins) !== JSON.stringify(appData.origins)
  }

  function handleAddOrigin() {
    setToggleAddOrigin((state) => !state)
  }

  const submitHandler = (data: FormValues) => {
    const updatedData: UpdatedAppDetails = {}
    if (dirtyFields.name) {
      updatedData.name = data.name
      updatedData.consentScreen = {
        name: data.name,
      }
    }
    if (dirtyFields.redirectUri)
      updatedData.redirectUris = data.redirectUri.split(',')
    if (dirtyFields.origins && areOriginsDirty())
      updatedData.origins = data.origins.map((origin) => origin.origin)

    if (Object.keys(updatedData).length < 1) return
    onSave(updatedData, resetForm)
  }

  function resetForm(isSuccess: boolean) {
    if (isSuccess) {
      reset({}, { keepDirtyValues: true })
    } else {
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
        <Label className="font-semibold" htmlFor="name">
          App name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Dummy"
          disabled={loading}
          {...register('name', { required: true })}
        />
        <p className="text-gray-500 text-sm">
          The name of auth client. The name is only used to identify the client
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
          <Button onClick={handleAddOrigin} type="button" disabled={loading}>
            Add Origin
          </Button>
        )}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
        <Label className="font-semibold" htmlFor="name">
          Authorized Redirect Url
        </Label>
        <Input
          id="redirectUri"
          type="text"
          placeholder="http://localhost:3000"
          disabled={loading}
          {...register('redirectUri', { required: true })}
        />
        <p className="text-gray-500 text-sm">
          The URL to which the user will be redirected after granting permission
        </p>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-[30%] rounded-lg bg-blue-600"
          disabled={!isFormDirty()}
        >
          {loading ? <Loader /> : 'Save'}
        </Button>
      </div>
    </form>
  )
}

export default ViewCredentialsForm
