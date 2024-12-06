export type AuthLoginRequest = { email: string; password: string }

export type AuthRegisterRequest = { email: string; password: string; firstName: string; lastName: string }

export type GetProfileResponse = { email: string; firstName: string; lastName: string; id: number }
