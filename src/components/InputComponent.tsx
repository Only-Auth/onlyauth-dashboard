import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'

function InputComponent({
  label,
  description,
  error,
  ...props
}: {
  label: string
  description: string
  error?: string
  id?: string
  type?: string
  placeholder?: string
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
      <Label className="font-semibold" htmlFor="appname">
        {label}
      </Label>
      <Input {...props} />
      <p className="text-gray-500 text-sm">{description}</p>
      <p>{error}</p>
    </div>
  )
}

export default InputComponent
