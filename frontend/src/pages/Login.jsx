import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)
  const emptyForm = { email: "", password: "" }
  const [userInfo, setUserInfo] = useState(emptyForm)

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
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">
        <Card className="w-full">
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
      </div>
    </>
  )
}

export default Login