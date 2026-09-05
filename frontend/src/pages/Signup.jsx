import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/slices/authSlice'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)
  const emptyForm = { fullName: "", email: "", password: "", confirmPassword: "" }
  const [userInfo, setUserInfo] = useState(emptyForm)

  function handleInputChange(e) {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  async function handleSignup(e) {
    e.preventDefault()

    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }

    const newUser = {
      name: userInfo.fullName,
      email: userInfo.email.trim().toLowerCase(),
      password: userInfo.password
    }

    const result = await dispatch(registerUser(newUser))

    if (registerUser.fulfilled.match(result)) {
      toast.success("Signup successful! Please login to continue.")
      setUserInfo(emptyForm)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } else {
      toast.error(result.payload?.msg || "Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-2xl font-bold text-transparent">Sign Up</CardTitle>
            <CardDescription>Create your account to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  type="text" 
                  id='fullName' 
                  name="fullName" 
                  value={userInfo.fullName} 
                  onChange={handleInputChange} 
                  placeholder="Your Name"
                  required
                  minLength="3"
                  title="Full name must be at least 3 characters"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id='email' 
                  name="email" 
                  value={userInfo.email} 
                  onChange={handleInputChange} 
                  placeholder="email@example.com"
                  required
                  title="Please enter a valid email address"
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
                  placeholder="Create a password"
                  required
                  minLength="6"
                  title="Password must be at least 6 characters"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  type="password" 
                  id='confirmPassword' 
                  name="confirmPassword" 
                  value={userInfo.confirmPassword} 
                  onChange={handleInputChange} 
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error.msg || error.error || "Something went wrong"}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-blue-600 underline hover:text-blue-800"
                disabled={loading}
              >
                Login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Signup