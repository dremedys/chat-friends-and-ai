import { Button, TextInput, Label } from 'flowbite-react'
import { useLogin, useRegister } from '@/shared/api/auth.ts'
import { useAuth } from '@/shared/providers'
import { STORAGE_KEYS } from '@/shared/constants'
import { ROUTES } from '@/shared/constants/router.ts'
import { AuthRegisterRequest } from '@/shared/types/auth.ts'
import { useForm, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate()

  const { handleSubmit, control } = useForm<AuthRegisterRequest>()
  const { mutateAsync } = useRegister()
  const { mutateAsync: loginMutate } = useLogin()
  const { setIsAuth } = useAuth()

  const onSubmit = handleSubmit((val) => {
    console.log(val)
    mutateAsync(val).then(() => {
      loginMutate(val).then(() => {
        setIsAuth(true)
        localStorage.setItem(STORAGE_KEYS.isAuth, JSON.stringify(true))
        navigate(ROUTES.index)
      })
    })
  })

  return (
    <div>
      <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput {...field} id="email" type="email" placeholder="alan_turing@gmail.com" required />
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

        <Label htmlFor="firstName" value="First Name" />
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => <TextInput {...field} id="firstName" placeholder="Alan" required />}
        />

        <Label htmlFor="lastName" value="Last Name" />
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => <TextInput {...field} id="lastName" placeholder="Turing" required />}
        />

        <p className="mb-2 text-xs text-gray-500">
          Already have an account?{' '}
          <Link className="text-blue-500" to={`${ROUTES.auth.index}/${ROUTES.auth.login}`}>
            Sign in
          </Link>
        </p>
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}
