'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import api from '@/utils/axiosInstance'
import { useAuth } from '@/contexts/auth-context'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post('/auth/login', values)

      const { accessToken } = response.data

      login(accessToken)

      toast.success('Login successful!')
      router.push('/')
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Login failed'
      toast.error(typeof message === 'string' ? message : message.join(', '))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 pt-6">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" type="email" {...field} />
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
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>

          <p className="text-center mt-4">
            Don’t have an account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
