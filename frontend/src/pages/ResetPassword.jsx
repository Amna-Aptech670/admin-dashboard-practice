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
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-2xl font-bold text-transparent">Reset Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword