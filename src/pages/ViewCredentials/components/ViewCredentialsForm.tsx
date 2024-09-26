import { useForm } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'
import InputComponent from '@/components/InputComponent'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

function ViewCredentialsForm() {
  const { register } = useForm()
  const [allowedOrigins, setAllowedOrigins] = useState<string[]>([
    'http://localhost:3000',
    'http://localhost:3001',
  ])

  const [toggleAddOrigin, setToggleAddOrigin] = useState(false)

  function handleAddOrigin() {
    setToggleAddOrigin((state) => !state)
  }

  return (
    <form>
      <InputComponent
        description="The name of auth client. The name is only used to identify the
        client"
        label="App name"
        id="appname"
        type="text"
        placeholder="Dummy"
        {...register('appname', { required: true })}
      />
      <div className="grid w-full max-w-sm items-center gap-1.5 pb-4">
        <Label className="font-semibold">Authorized JavaScript origins</Label>
        <div className="pb-2">
          {allowedOrigins.map((origin, index) => (
            <div className="my-1">
              <p className="text-gray-500 text-sm  pb-1">Origin {index + 1}</p>
              <div className="flex items-center gap-2">
                <Input
                  key={index}
                  type="text"
                  id={`origin-${index}`}
                  placeholder="http://localhost:3000"
                  defaultValue={origin}
                />
                <MdDelete
                  className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-600"
                  size={24}
                />
              </div>
            </div>
          ))}
        </div>
        {toggleAddOrigin ? (
          <div>
            <div className="my-1">
              <p className="text-gray-500 text-sm  pb-1">New Origin</p>

              <Input
                type="text"
                id={'newOrigin'}
                placeholder="http://localhost:3000"
              />
            </div>
            <div className="flex justify-end gap-2 py-2">
              <Button
                onClick={() => setToggleAddOrigin((state) => !state)}
                type="button"
                variant={'secondary'}
              >
                Cancel
              </Button>
              <Button type="button">Save</Button>
            </div>
          </div>
        ) : (
          <Button onClick={handleAddOrigin} type="button">
            Add Origin
          </Button>
        )}
      </div>

      <InputComponent
        label="Authorized Redirect Url"
        description="The URL to which the user will be redirected after granting permission"
        type="text"
        id="redirecturl"
        placeholder="http://localhost:3000"
      />
    </form>
  )
}

export default ViewCredentialsForm
