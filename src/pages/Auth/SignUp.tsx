import SignupForm from '@/components/SignUpForm'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from '@/layout/Auth'
import CardLayout from '@/layout/Card'

function SignUp() {
  const { loading, error, handleSignUp } = useAuth()

  return (
    <AuthLayout>
      {' '}
      <CardLayout
        header={'Create an account'}
        ctaDescription={'Already have an account?'}
        domain={'example.com'}
        ctaText={'Sign in'}
        ctaLink={'/login'}
      >
        <p className="text-sm text-red-500">{error}</p>
        <SignupForm signupHandler={handleSignUp} loading={loading} />
      </CardLayout>
    </AuthLayout>
  )
}

export default SignUp
