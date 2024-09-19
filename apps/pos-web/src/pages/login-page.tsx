import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@pkg/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@pkg/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@pkg/ui/form'
import { Input } from '@pkg/ui/input'
import { loginSchema } from '@pkg/validation/auth'
import { LoginSchema } from '@pkg/validation/types/auth'
import { useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

import { $login, login } from '@/api/auth'

export function LoginPage() {
  const [, setCookie] = useCookies(['access_token'])

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const loginMutation = useMutation<
    InferResponseType<typeof $login>,
    Error,
    InferRequestType<typeof $login>['form']
  >({
    mutationFn: async form => {
      const response = await login({
        email: form.email as string,
        password: form.password as string
      })

      if (!response) throw new Error('Login failed')
      return response
    },
    onSuccess: data => {
      setCookie('access_token', data.token, { expires: new Date(data.payload.exp * 1000) })
      toast.success('Login successful')
    },
    onError: err => toast.error(err.message)
  })

  function onSubmit(values: LoginSchema) {
    loginMutation.mutate(values)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="login-form" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@mail.co" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link className="link" to="/register">
                Not registered yet?
              </Link>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <Link className="link" to="/forgot-password">
            Forgot password?
          </Link>
          <Button form="login-form" type="submit" variant="fill">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
