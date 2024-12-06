import { describe, expect, it } from 'vitest'
import { GetMessageResponseWithStatus } from '@/entities/message'
import { render } from '@/shared/config/tests'
import { Chat } from './chat'

const currentUserId = -1
const toUserId = 2
const messages_mock: GetMessageResponseWithStatus[] = [
  { fromUserId: -1, toUserId, content: 'he', timestamp: '2024-12-01T14:55:04.412Z', id: 1 },
  { fromUserId: toUserId, toUserId: currentUserId, content: 'he', timestamp: '2024-12-02T14:55:04.412Z', id: 2 },
]

describe('chat', () => {
  it('should render ChatError block if has error', () => {
    const { getByText } = render(
      <Chat
        messages={messages_mock}
        isLoading={false}
        errorState={{ isError: true, onRetry: () => {} }}
        currentUserId={currentUserId}
      />,
    )
    expect(getByText('Error occurred while sending message')).toBeInTheDocument()
  })
  it('should render ChatEmpty block if no messages', () => {
    const { getByText } = render(
      <Chat
        messages={[]}
        isLoading={false}
        errorState={{ isError: false, onRetry: () => {} }}
        currentUserId={currentUserId}
      />,
    )
    expect(getByText('No messages yet')).toBeInTheDocument()
  })
})
