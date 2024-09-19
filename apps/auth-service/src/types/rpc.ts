import { app } from '@/index'

export type AppType = typeof app
export type WTF = AppType & {
  hello: string
  world: string
}

// export default AppType
