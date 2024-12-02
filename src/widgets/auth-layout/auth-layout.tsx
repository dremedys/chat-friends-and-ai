import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="flex h-full items-center justify-center ">
      <div className="border-gray-300 p-6 rounded-lg bg-white">
        <Outlet />
      </div>
    </div>
  )
}
