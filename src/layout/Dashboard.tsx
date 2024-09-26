import { Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import useWindowResize from '@/hooks/useWindowResize'
import { Toaster } from '@/components/ui/toaster'

function DashboardLayout() {
  const windowWidth = useWindowResize()

  return (
    <>
      <div className="w-screen h-screen flex">
        {/* LEFT SECTION */}
        {windowWidth > 1024 && (
          <div className="bg-white h-full lg:visible invisible p-10">
            <Navbar />
          </div>
        )}

        {/* RIGHT SECTION */}
        <div className="flex-grow bg-[#f9fafb] p-8 ">
          <Header />
          <div className="pt-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default DashboardLayout
