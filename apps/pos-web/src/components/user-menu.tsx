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
import { useQuery } from '@tanstack/react-query'
import { Bell, Moon, Sun } from 'lucide-react'

import { getCurrentUser } from '@/api/user'
import { useTheme } from '@/components/theme-provider'
import { getPayloadFromToken } from '@/lib/jwt'

export function UserMenu() {
  const { setTheme } = useTheme()
  const [cookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const payload = getPayloadFromToken(cookies.access_token)
  const email = payload.email as string

  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['user', email],
    queryFn: async () => await getCurrentUser(email),
    enabled: Boolean(email)
  })

  if (!cookies.access_token) {
    navigate('/login')
  }

  useEffect(() => {
    if (!cookies.access_token) {
      navigate('/login')
    }
    return () => {}
  }, [navigate, cookies.access_token])

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
            <span>Harith Iqbal {JSON.stringify(user)}</span>
            <img
              src="https://avatars.githubusercontent.com/u/25774162?v=4"
              alt="Harith Iqbal"
              className="rounded-full size-6"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
