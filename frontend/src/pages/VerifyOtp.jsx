import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useLocation } from 'react-router-dom'
import { verifyEmail, verifyOtp } from '@/redux/slices/forgotPassword/forgotPasswordSlice'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const reduxEmail = useSelector((state) => state.forgotPassword.email)
  const { loading, error, otpVerified } = useSelector((state) => state.forgotPassword)
  const email = reduxEmail || location.state?.email || ""

  const [otp, setOtp] = useState("")

  useEffect(() => {
    if (otpVerified) {
      navigate('/reset-password', { state: { email } })
    }
  }, [otpVerified, email, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(verifyOtp({ email, otp }))
  }

  function handleResend() {
    if (email) {
      dispatch(verifyEmail(email))
    } else {
      navigate('/forgot-password')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/40 px-4 py-10">

      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <Card className="relative w-full max-w-md overflow-hidden border-border/60 bg-background/95 shadow-xl backdrop-blur">

        {/* Top accent */}
        <div className="h-1.5 w-full bg-primary" />

        <CardHeader className="px-7 pb-5 pt-8 text-center">

          {/* OTP icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl shadow-sm">
            ✉️
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Verify your email
          </CardTitle>

          <CardDescription className="mx-auto mt-2 max-w-sm text-sm leading-6">
            {email
              ? `Enter the verification code sent to ${email}`
              : "Enter the verification code sent to your email."}
          </CardDescription>

        </CardHeader>

        <CardContent className="px-7 pb-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* OTP */}
            <div className="space-y-2">
              <Label
                htmlFor="otp"
                className="text-sm font-medium"
              >
                Verification Code
              </Label>

              <Input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit code"
                maxLength={4}
                required
                disabled={loading}
                className="h-12 rounded-lg bg-muted/30 px-4 text-center text-lg font-semibold tracking-[0.5em] transition-colors focus-visible:bg-background"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
                <p className="text-center text-sm text-destructive">
                  {error?.error || "Something went wrong"}
                </p>
              </div>
            )}

            {/* Verify button */}
            <Button
              type="submit"
              className="h-11 w-full rounded-lg text-sm font-semibold shadow-sm transition-all hover:shadow-md"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>

          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Didn't receive a code?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-primary underline-offset-4 hover:underline"
              disabled={loading}
            >
              Resend
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyOtp