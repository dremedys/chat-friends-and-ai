import { FC } from 'react'
import { Alert, Button } from 'flowbite-react'
import { HiInformationCircle, HiRefresh } from 'react-icons/hi'

type Props = {
  onRetry: () => void
}

export const ChatError: FC<Props> = ({ onRetry }) => {
  return (
    <Alert color="failure" className=" mx-auto w-[300px] mb-6 border border-red-700" icon={HiInformationCircle}>
      <div className="flex w-full items-center gap-x-6 justify-between">
        <span className="font-medium">Error occurred while sending message</span>
        <Button onClick={onRetry} color="failure" size="xs" className="mx-auto flex items-center gap-x-1">
          <HiRefresh />
        </Button>
      </div>
    </Alert>
  )
}
