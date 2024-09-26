import LoginForm from '@/components/LoginForm'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from '@/layout/Auth'
import CardLayout from '@/layout/Card'

function Login() {
  const { handleSignIn, loading, error } = useAuth()

  return (
    <AuthLayout>
      <CardLayout
        header={'Sign in'}
        domain={'example.com'}
        ctaDescription={'Don’t have an account?'}
        ctaText={'Create Account'}
        ctaLink={'/signup'}
      >
        <p className="text-sm text-red-500">{error}</p>
        <LoginForm loginHandler={handleSignIn} loading={loading} />
      </CardLayout>
    </AuthLayout>
  )
}

export default Login
