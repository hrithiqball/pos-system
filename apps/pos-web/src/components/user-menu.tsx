import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Button } from '@pkg/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@pkg/ui/dropdown-menu'
import { ErrorComponent } from '@pkg/ui/error'
import { LoadingComponent } from '@pkg/ui/loading'
import { useMutation, useQuery } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { Bell, Moon, Sun } from 'lucide-react'
import { toast } from 'sonner'

import { $logout, logout } from '@/api/auth'
import { getUser } from '@/api/user'
import { useTheme } from '@/components/theme-provider'
import { getPayloadFromToken } from '@/lib/jwt'
import { useAuthStore } from '@/store/use-auth'
import { useUserStore } from '@/store/use-user'

export function UserMenu() {
  const { setTheme } = useTheme()
  const [cookies] = useCookies(['user_token'])
  const navigate = useNavigate()
  const { setAuthenticated } = useAuthStore()
  const { user, setUser } = useUserStore()

  const payload = getPayloadFromToken(cookies.user_token)
  const email = payload ? (payload.email as string) : null

  const {
    data: userResponse,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['user', email],
    queryFn: async () => await getUser(email),
    enabled: !user && Boolean(email)
  })

  const logoutMutation = useMutation<
    InferResponseType<typeof $logout>,
    Error,
    InferRequestType<typeof $logout>
  >({
    mutationFn: async () => {
      const response = await logout()

      if (!response) throw new Error('Logout failed')
      return response
    },
    onSuccess: data => {
      toast.success(data.message)
      setAuthenticated(false)

      navigate('/login')
    },
    onError: err => {
      toast.error(err.message)
    }
  })

  useEffect(() => {
    if (!cookies.user_token) {
      navigate('/login')
    }
    return () => {}
  }, [cookies.user_token, navigate])

  useEffect(() => {
    if (!user) {
      setUser(userResponse)
    }

    return () => {}
  }, [userResponse, user, setUser])

  if (!cookies.user_token) {
    navigate('/login')
  }

  async function handleLogout() {
    logoutMutation.mutate({})
  }

  if (isLoading) {
    return <LoadingComponent />
  }

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <div className="flexcenter space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
            <Moon className="size-4 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Bell className="size-4" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flexcenter px-2 py-1 rounded-sm space-x-4 cursor-pointer hover:bg-accent hover:text-accent-foreground">
            <span>{user?.name}</span>
            <img
              src="https://avatars.githubusercontent.com/u/25774162?v=4"
              alt={user?.name}
              className="rounded-full size-6"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
