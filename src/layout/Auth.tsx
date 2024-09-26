import { Toaster } from '@/components/ui/toaster'
import { FaGithub } from 'react-icons/fa6'

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-tr from-violet-500 to-orange-300 font-poppins">
        <div className="fixed top-6 right-6">
          <a className="text-sm font-semibold text-black cursor-pointer hover:underline">
            Need help?
          </a>
        </div>
        <a
          className="fixed bottom-6 right-6 bg-black rounded-full p-3 cursor-pointer transition-all hover:scale-105"
          target="_blank"
        >
          <FaGithub size={24} className="text-white" />
        </a>
        <div className="h-full flex justify-center items-center">
          {children}
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default AuthLayout
