import { Logo } from './logo'
import { useGetProfile } from '@/shared/api/auth.ts'
import { useAuth } from '@/shared/providers'

export const Header = () => {
  const { isAuth, handleLogout } = useAuth()
  const { data } = useGetProfile(isAuth)

  return (
    <header className="h-[92px] bg-basic-white flex items-center justify-between py-[18px] px-6 tablet:px-10 border-b border-border-gray">
      <Logo />
      <div>
        <p>
          {data?.firstName} {data?.lastName}
        </p>
        <p className="text-gray-400 cursor-pointer" onClick={handleLogout}>
          Logout
        </p>
      </div>
    </header>
  )
}
