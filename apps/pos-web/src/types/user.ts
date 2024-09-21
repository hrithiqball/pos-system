import { getUser } from '@/api/user'

export type User = Awaited<ReturnType<typeof getUser>>
