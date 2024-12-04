import { FC, PropsWithChildren } from 'react'
import { positions, transitions, Provider, AlertTemplateProps } from 'react-alert'
import { Alert } from 'flowbite-react'

export const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000000,
    offset: '30px',
    transition: transitions.SCALE,
  }
  return (
    <Provider template={AlertCustom} {...options}>
      {children}
    </Provider>
  )
}

const AlertCustom: FC<AlertTemplateProps> = ({ close, options, message }) => {
  const typeMap = {
    info: 'info',
    success: 'success',
    error: 'failure',
  }
  return (
    <Alert onDismiss={close} color={options.type ? typeMap[options.type] : 'info'} className="bottom-6">
      {message}
    </Alert>
  )
}
