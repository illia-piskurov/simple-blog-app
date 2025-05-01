'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/axiosInstance'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import type User from '@/shared/types/user.interface'
import { BackArrow } from '@/components/back-arrow'


export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      router.push('/login')
      return
    }

    api
      .get<User>('http://localhost:3000/auth/@me')
      .then((res) => setUser(res.data))
      .catch(() => {
        toast.error('Failed to load profile.')
        router.push('/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async () => {
    if (!user) return

    try {
      await api.patch(`/users/profile`, user)
      toast.success('Profile updated successfully.')
    } catch {
      toast.error('Failed to update profile.')
    }
  }

  if (loading) return <div className="p-6">Loading...</div>
  if (!user) return null

  return (
    <div className="max-w-xl mx-auto p-6 pt-24">
      <BackArrow />
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      {[
        'username',
        'email',
        'firstName',
        'lastName',
        'age',
        'gender',
        'address',
        'website',
      ].map((field) => (
        <div key={field} className="mb-4">
          <Label htmlFor={field} className="capitalize">
            {field}
          </Label>
          <Input
            id={field}
            name={field}
            value={user[field as keyof User] ?? ''}
            onChange={handleChange}
            type={field === 'age' ? 'number' : 'text'}
          />
        </div>
      ))}

      <Button onClick={handleSubmit} className="mt-4 mr-4">
        Save Changes
      </Button>
    </div>
  )
}
