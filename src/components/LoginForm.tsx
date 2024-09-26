import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from './Loader'

function LoginForm({
  loginHandler,
  loading,
}: {
  loginHandler: ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => void
  loading: boolean
}) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const iconStyles =
    'absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer'

  function submitHandler(data: any) {
    loginHandler({ email: data.email, password: data.password })
  }

  return (
    <div className="w-full max-w-sm pt-8 p-4 ">
      <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="h-12"
            {...register('email', {
              required: "Email can't be empty",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
          />
          <p className="text-xs text-red-500">
            {errors.email?.message?.toString()}
          </p>
        </div>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="h-12"
              {...register('password', {
                required: 'Please enter password',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {showPassword ? (
              <EyeOff
                className={iconStyles}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <Eye
                className={iconStyles}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
          <p className="text-xs text-red-500">
            {errors.password?.message?.toString()}
          </p>
        </div>
        <Button className="w-full h-12 rounded-lg" disabled={loading}>
          {loading ? <Loader /> : 'Sign In'}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
