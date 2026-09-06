import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, fetchAllUsers } from '../redux/slices/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, users } = useSelector((state) => state.auth)
  const emptyForm = { email: "", password: "" }
  const [userInfo, setUserInfo] = useState(emptyForm)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  function handleInputChange(event) {
    const { name, value } = event.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  async function handleLogin(event) {
    event.preventDefault()
    const result = await dispatch(loginUser(userInfo))

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful! Welcome back.")
      navigate('/')
    } else {
      toast.error(result.payload?.msg || "Login failed. Please try again.")
    }
  }

  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-4 py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-2xl font-bold text-transparent">Login Form</CardTitle>
            <CardDescription>Enter your account details to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id='email' 
                  name="email" 
                  value={userInfo.email} 
                  onChange={handleInputChange} 
                  placeholder="admin@example.com" 
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password" 
                  id='password' 
                  name="password" 
                  value={userInfo.password} 
                  onChange={handleInputChange} 
                  placeholder="Enter password" 
                  required
                  disabled={loading}
                />
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-xs font-medium text-blue-600 underline hover:text-blue-800"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error.msg || error.error || "Something went wrong"}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-semibold text-blue-600 underline hover:text-blue-800"
                disabled={loading}
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-muted-foreground">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u._id} className="border-b last:border-0">
                        <td className="py-2 pr-4">{u.name}</td>
                        <td className="py-2 pr-4">{u.email}</td>
                        <td className="py-2 pr-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Login