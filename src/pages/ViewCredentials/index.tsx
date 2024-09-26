import { Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'

import CopyCTA from '@/components/CopyCTA'
import ViewCredentialsForm from './components/ViewCredentialsForm'

function ViewCredentials() {
  return (
    <>
      <div className="flex items-center gap-x-4">
        <Link to={'..'}>
          <IoArrowBack size={20} />
        </Link>
        <p className="text-2xl font-semibold">Client details</p>
      </div>
      <div className="sm:p-10 p-4 flex sm:flex-row flex-col sm:gap-20">
        <ViewCredentialsForm />
        <div className="my-4 bg-gray-100 rounded-xl p-6 w-full max-w-[500px] h-max">
          <h1 className="text-lg font-semibold">Additional Info :</h1>
          <div className="mt-4">
            <p className="font-semibold text-gray-600">Client ID</p>
            <div className="flex gap-2">
              <p className="text-ellipsis overflow-hidden">
                34697234619782346197
              </p>
              <CopyCTA clientId="" />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-gray-600">Created At</p>
            <p className="text-ellipsis overflow-hidden">
              34697234619782346197
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewCredentials
