import { GetMessageResponseDto } from '@/shared/types/message'

export type GetMessageResponseWithStatus = GetMessageResponseDto & { isError?: boolean }
