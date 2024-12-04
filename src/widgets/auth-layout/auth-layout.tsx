import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="flex h-full items-center justify-center ">
      <div className="border-gray-300 p-6 rounded-lg bg-white w-[90%] mobile:w-[400px]">
        <h1 className="font-semibold text-lg text-basic-black text-center mb-4">Welcome to Cloudmix!</h1>
        <Outlet />
      </div>
    </div>
  )
}
