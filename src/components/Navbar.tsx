import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import CredentialsIcon from './iconify/CredentialsIcon'
import AnalyticsIcon from './iconify/AnalyticsIcon'
import ConsentIcon from './iconify/ConsentIcon'
import LogOutIcon from './iconify/LogOutIcon'
import { useAuth } from '@/hooks/useAuth'

function Navitem({
  icon,
  label,
  linkTo,
}: {
  label: string
  icon: React.ReactNode
  linkTo: string
}) {
  const baseClass = ' flex items-center rounded-xl px-4 py-4 gap-4'
  const activeClass = ' bg-blue-100 text-blue-800'
  const inactiveClass = ' hover:bg-gray-100 hover:text-gray-800 text-gray-700 '
  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) =>
        classNames(
          baseClass,
          { [activeClass]: isActive },
          { [inactiveClass]: !isActive }
        )
      }
    >
      <div className="text-3xl">{icon}</div>
      <div className="text-md font-semibold">{label}</div>
    </NavLink>
  )
}

function LogOutAlertDialog({ handleLogOut }: { handleLogOut: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center rounded-xl px-4 py-4 gap-4 text-red-600  hover:bg-red-100">
          <LogOutIcon className="text-3xl" />
          <div className="text-md font-semibold">Log out</div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out and need to log in again to access your
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleLogOut} className="bg-red-700">
            Log out
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function Navbar() {
  const { handleLogOut } = useAuth()
  return (
    <>
      <p className="text-3xl font-bold">Dasboard</p>
      <div className="flex flex-col h-full justify-between pb-5">
        <div className="flex flex-col gap-2 mt-5">
          <Navitem
            icon={<CredentialsIcon />}
            label="Credentials"
            linkTo="/credentials"
          />
          <Navitem
            icon={<ConsentIcon />}
            label="Consent Screen"
            linkTo="/consent"
          />
          <Navitem
            icon={<AnalyticsIcon />}
            label="Analytics"
            linkTo="/analytics"
          />
        </div>
        <LogOutAlertDialog handleLogOut={handleLogOut} />
      </div>
    </>
  )
}

export default Navbar
