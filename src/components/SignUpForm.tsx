import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from './Loader'

function SignupForm({
  signupHandler,
  loading,
}: {
  signupHandler: (data: any) => void
  loading: boolean
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const iconStyles =
    'absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer'

  function submitHandler(data: any) {
    signupHandler(data)
  }
  return (
    <div className="w-full max-w-sm pt-10 p-4 ">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        <div className="grid items-center gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Full name"
            className="h-12"
            {...register('name', {
              required: "Name can't be empty",
            })}
          />
          <p className="text-xs text-red-500">
            {errors.name?.message?.toString()}
          </p>
        </div>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
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
              id="password"
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
        <div className="grid items-center gap-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="h-12"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: (value) =>
                  value === getValues('password') || 'Passwords do not match!',
              })}
            />
            {showConfirmPassword ? (
              <EyeOff
                className={iconStyles}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            ) : (
              <Eye
                className={iconStyles}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            )}
          </div>
          <p className="text-xs text-red-500">
            {errors.confirmPassword?.message?.toString()}
          </p>
        </div>
        <Button type={'submit'} className="w-full h-12 rounded-lg">
          {loading ? <Loader /> : 'Sign Up'}
        </Button>
      </form>
    </div>
  )
}

export default SignupForm
