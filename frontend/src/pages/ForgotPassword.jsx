import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { resetForgotPassword, setEmail, verifyOtp } from '@/redux/slices/forgotPassword/forgotPasswordSlice'


const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { email, loading, error, otpSent } = useSelector((state) => state.forgotPassword)

  useEffect(() => {
    if (otpSent) {
      navigate('/verify-otp', { state: { email } })
      dispatch(resetForgotPassword())
    }
  }, [otpSent, email, navigate, dispatch])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(verifyOtp(email))
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-2xl font-bold text-transparent">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive a verification code.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="admin@example.com"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error?.error || "Something went wrong"}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Remembered your password?{' '}
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
  )
}

export default ForgotPassword