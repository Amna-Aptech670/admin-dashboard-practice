import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import { setEmail, verifyEmail } from '@/redux/slices/forgotPassword/forgotPasswordSlice'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { email, loading } = useSelector((state) => state.forgotPassword)

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(verifyEmail(email))
      .unwrap()
      .then((result) => {
        toast.success(result.msg || "OTP sent successfully")
        navigate('/verify-otp', { state: { email } })
      })
      .catch((err) => {
        toast.error(err?.error || "Something went wrong")
      })
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

          {/* Lock icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl shadow-sm">
            🔑
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Forgot your password?
          </CardTitle>

          <CardDescription className="mx-auto mt-2 max-w-sm text-sm leading-6">
            No worries. Enter your email address and we’ll send you a
            verification code to reset your password.
          </CardDescription>

        </CardHeader>

        <CardContent className="px-7 pb-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Email Address
              </Label>

              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                placeholder="admin@example.com"
                required
                disabled={loading}
                className="h-11 rounded-lg bg-muted/30 px-4 transition-colors focus-visible:bg-background"
              />
            </div>

            {/* Info */}
            <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <p className="text-xs leading-5 text-muted-foreground">
                📩 You’ll receive a one-time verification code at this email
                address.
              </p>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-lg text-sm font-semibold shadow-sm transition-all hover:shadow-md"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>

          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Remembered your password?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-semibold text-primary underline-offset-4 hover:underline"
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