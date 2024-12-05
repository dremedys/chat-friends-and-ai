import { FC } from 'react'
import { AlertTemplateProps } from 'react-alert'
import { Alert } from 'flowbite-react'

export const AlertCustomized: FC<AlertTemplateProps> = ({ close, options, message }) => {
  return (
    <Alert
      onDismiss={close}
      color={options.type ? mapReactAlertTypesToFlowbiteAlertTypes[options.type] : 'info'}
      className="bottom-6"
    >
      {message}
    </Alert>
  )
}

const mapReactAlertTypesToFlowbiteAlertTypes = {
  info: 'info',
  success: 'success',
  error: 'failure',
}
