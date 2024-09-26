import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'

function ConfigureConsent() {
  return (
    <>
      <div className="flex items-center gap-x-4">
        <Link to={'..'}>
          <IoArrowBack size={20} />
        </Link>
        <p className="text-2xl font-semibold">Client details</p>
      </div>
      <div className="flex flex-col mt-10 gap-y-4">
        <h1 className="text-xl">App Info :</h1>
        <div className="pl-2 mb-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="appname">Name</Label>
            <Input type="text" id="appname" placeholder="Dummy" />
            <p></p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="appicon">Icon</Label>
            <Input id="appicon" type="file" />
          </div>
        </div>
        <h1 className="text-xl">Developer Info :</h1>
        <div className="pl-2">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="example@email.com" />
            <p></p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="address">App Address</Label>
            <Input type="text" id="address" placeholder="awesomedummy.com" />
            <p></p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
            <Label htmlFor="message">Message</Label>
            <Input
              type="text"
              id="message"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing..."
            />
            <p></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfigureConsent
