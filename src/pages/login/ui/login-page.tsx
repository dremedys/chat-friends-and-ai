import { Controller, useForm } from 'react-hook-form'
import { Button, TextInput, Label } from 'flowbite-react'
import { useLogin } from '@/shared/api/auth.ts'
import { useAuth } from '@/shared/providers'
import { STORAGE_KEYS } from '@/shared/constants'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/router'
import { AuthLoginRequest } from '@/shared/types/auth'
import { useAlert } from 'react-alert'

export const LoginPage = () => {
  const navigate = useNavigate()

  const { handleSubmit, control, setError } = useForm<AuthLoginRequest>({ defaultValues: { email: '', password: '' } })
  const { mutateAsync, isPending } = useLogin()
  const { setIsAuth } = useAuth()
  const alert = useAlert()

  const onSubmit = handleSubmit((val) => {
    mutateAsync(val)
      .then(() => {
        setIsAuth(true)
        localStorage.setItem(STORAGE_KEYS.isAuth, JSON.stringify(true))
        navigate(ROUTES.index)
      })
      .catch((err) => {
        if (err?.response?.data.message === 'invalid_credentials') {
          setError('email', { message: 'Invalid email or password :(' })
        } else {
          alert.error('Server error. Try Later')
        }
      })
  })

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              id="email"
              type="email"
              placeholder="alan_turing@gmail.com"
              required
              helperText={
                fieldState.error ? <span className="text-red-700 text-xs">{fieldState.error.message}</span> : null
              }
            />
          )}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <Controller
          control={control}
          name="password"
          render={({ field }) => <TextInput {...field} id="password" type="password" required />}
        />
      </div>
      <p className="mb-2 text-xs text-gray-500">
        Don't have an account?{' '}
        <Link className="text-blue-500" to={`${ROUTES.auth.index}/${ROUTES.auth.register}`}>
          Sign up
        </Link>
      </p>
      <Button gradientDuoTone="purpleToBlue" type="submit" isProcessing={isPending}>
        Continue
      </Button>
    </form>
  )
}
