import NavigationDrawer from './NavigationDrawer'
import NotificationSheet from './NotificationSheet'

function Header() {
  return (
    <div className="flex items-center justify-between  ">
      <NavigationDrawer />
      <NotificationSheet />
    </div>
  )
}

export default Header
