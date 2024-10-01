import { Button } from '@/components/ui/button'
import ClientIdTable from './components/ClientIdTable'
import { SquarePen } from 'lucide-react'
import { Link } from 'react-router-dom'

function Credentials() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Credentials</h1>
      <p className="text-gray-600">Manage your client IDs and secrets.</p>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Applications</h1>
          <Link to={'create'}>
            <Button className="gap-2 rounded-lg">
              <SquarePen size={16} />
              <span>Create</span>
            </Button>
          </Link>
        </div>
        <ClientIdTable />
      </div>
    </div>
  )
}

export default Credentials
