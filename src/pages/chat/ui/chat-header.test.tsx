import { describe, expect, it } from 'vitest'
import { GetProfileResponse } from '@/shared/types/auth.ts'
import { ChatHeader } from './chat-header'
import { render } from '@/shared/config/tests'

const userMock: GetProfileResponse = { id: 1, email: 'friend@mail.com', firstName: 'Best', lastName: 'Friend' }

describe('ChatHeader', () => {
  it('should render user firstname and lastname', () => {
    const { getByText } = render(<ChatHeader user={userMock} />)
    expect(getByText('Best Friend')).toBeInTheDocument()
  })
  it('should render back button for mobile screen', () => {
    const { getByTestId } = render(<ChatHeader user={userMock} />)

    // eslint-disable-next-line no-global-assign
    window = Object.assign(window, { innerWidth: 400 })
    expect(getByTestId('back_btn')).toBeVisible()
  })
})
