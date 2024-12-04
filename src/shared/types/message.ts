export type GetMessageResponseDto = {
  id: number
  fromUserId: number
  toUserId: number
  content: string
  timestamp: string
}

export type SendMessageRequest = {
  content: string
  toUserId: number
  fromUserId: number
}

export type GetChatResponseDto = {
  user: { id: number; firstName: string; lastName: string; email: string }
  lastMessage: { content: string; timestamp: string }
}
