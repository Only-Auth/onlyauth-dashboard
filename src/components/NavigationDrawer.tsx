import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CgMenuLeft } from 'react-icons/cg'
import Navbar from './Navbar'

function NavigationDrawer() {
  return (
    <div className="lg:invisible visible">
      <Sheet>
        <SheetTrigger>
          <CgMenuLeft size={24} />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <Navbar />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default NavigationDrawer
