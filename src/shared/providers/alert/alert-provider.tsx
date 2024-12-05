import { FC, PropsWithChildren } from 'react'
import { positions, transitions, Provider } from 'react-alert'
import { AlertCustomized } from './alert-customized.tsx'

export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000000,
    offset: '30px',
    transition: transitions.SCALE,
  }
  return (
    <Provider template={AlertCustomized} {...options}>
      {children}
    </Provider>
  )
}
