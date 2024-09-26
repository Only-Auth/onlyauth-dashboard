import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import NotificationIcon from './iconify/NotificationIcon'
function NotificationSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <NotificationIcon fontSize={24} />
      </SheetTrigger>
      <SheetContent side={'right'}>
        <SheetTitle>Notifications</SheetTitle>
        <SheetDescription>
          Your notifications will appear here.
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default NotificationSheet
