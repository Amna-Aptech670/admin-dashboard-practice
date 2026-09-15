import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useLocation } from 'react-router-dom'
import { resetForgotPassword, resetPassword } from '@/redux/slices/forgotPassword/forgotPasswordSlice'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const reduxEmail = useSelector((state) => state.forgotPassword.email)
  const { loading } = useSelector((state) => state.forgotPassword)
  const email = reduxEmail || location.state?.email || ""

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    dispatch(resetPassword({ email, newPassword }))
      .unwrap()
      .then((result) => {
        toast.success(result.msg || "Password reset successfully")
        dispatch(resetForgotPassword())
        navigate('/login')
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
            🔐
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Reset your password
          </CardTitle>

          <CardDescription className="mx-auto mt-2 max-w-sm text-sm leading-6">
            Create a new password for your account. Make sure it’s strong and
            easy for you to remember.
          </CardDescription>

        </CardHeader>

        <CardContent className="px-7 pb-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* New Password */}
            <div className="space-y-2">
              <Label
                htmlFor="newPassword"
                className="text-sm font-medium"
              >
                New Password
              </Label>

              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
                className="h-11 rounded-lg bg-muted/30 px-4 transition-colors focus-visible:bg-background"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium"
              >
                Confirm Password
              </Label>

              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="h-11 rounded-lg bg-muted/30 px-4 transition-colors focus-visible:bg-background"
              />
            </div>

            {/* Password hint */}
            <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <p className="text-xs leading-5 text-muted-foreground">
                💡 Choose a strong password that you haven’t used before.
              </p>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-lg text-sm font-semibold shadow-sm transition-all hover:shadow-md"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>

          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Your password will be updated securely.
          </p>

        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword