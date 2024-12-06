import { GetProfileResponse } from '@/shared/types/auth'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/router'

type Props = {
  user?: GetProfileResponse
}
export const ChatHeader: FC<Props> = ({ user }) => {
  return (
    <header className="px-6 tablet:px-10 py-[18px] bg-basic-white h-[76px] border-b border-border-gray flex items-start gap-x-1">
      <Link to={ROUTES.index} className="tablet:hidden">
        <img src="back.svg" className="mt-[4px]" />
      </Link>
      <div>
        <p className="text-lg">{user ? `${user?.firstName} ${user?.lastName}` : 'Loading...'}</p>
        <p className="text-gray-400">Online</p>
      </div>
    </header>
  )
}
