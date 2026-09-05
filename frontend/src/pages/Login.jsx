import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const emptyForm = { email: "", password: "" }
  const [userInfo, setUserInfo] = useState(emptyForm)
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const apiUrl = 'https://6a2258865c61035328699e51.mockapi.io/Users'

  function handleInputChange(event) {
    const { name, value } = event.target
    setUserInfo({ ...userInfo, [name]: value })
    setLoginError("")
  }

  async function handleLogin(event) {
    event.preventDefault()
    setIsLoading(true)
    setLoginError("")

    try {
      const response = await axios.get(apiUrl)
      const allUsers = response.data
      const matchedUser = allUsers.find(
        user => user.email === userInfo.email.trim().toLowerCase() && user.password === userInfo.password
      )
      
      if (matchedUser) {
        toast.success("Login successful! Welcome back.")
        console.log("Login successful!", matchedUser)
   
        const { password, ...safeUser } = matchedUser
        localStorage.setItem('currentUser', JSON.stringify(safeUser))
        
        navigate('/')
      } else {
        setLoginError("Wrong email or password. Please sign up first.")
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError("Something went wrong. Please try again.")
      toast.error("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center">
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>

              {loginError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {loginError}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-semibold text-blue-600 underline hover:text-blue-800"
                disabled={isLoading}
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