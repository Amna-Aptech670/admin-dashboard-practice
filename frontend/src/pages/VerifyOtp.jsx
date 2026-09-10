import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useLocation } from 'react-router-dom'
import { verifyOtp } from '@/redux/slices/forgotPassword/forgotPasswordSlice'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const reduxEmail = useSelector((state) => state.forgotPassword.email)
  const { loading, error } = useSelector((state) => state.forgotPassword)
  const email = reduxEmail || location.state?.email || ""

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    // TODO: backend call yahan aayegi (OTP verify karne ke liye — check-otp controller/route abhi nahi bana)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/reset-password', { state: { email, otp } })
    }, 1000)
  }

  function handleResend() {
    if (email) {
      dispatch(verifyOtp(email))
    } else {
      navigate('/forgot-password')
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-2xl font-bold text-transparent">Verify OTP</CardTitle>
          <CardDescription>
            {email ? `Enter the code sent to ${email}` : "Enter the verification code sent to your email."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error?.error || "Something went wrong"}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Didn't receive a code?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-blue-600 underline hover:text-blue-800"
              disabled={isLoading || loading}
            >
              {loading ? 'Resending...' : 'Resend'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyOtp