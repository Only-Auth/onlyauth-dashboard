import { useEffect, useState } from 'react'

import { DataTable } from './DataTable'
import { ClientId, columns } from './Columns'
import DUMMY_CLIENT_DATA from '../../data/dummyClientIds'

const ClientIdTable: React.FC = () => {
  const [data, setData] = useState<ClientId[]>([])
  async function getData(): Promise<ClientId[]> {
    return new Promise((resolve) => {
      resolve(DUMMY_CLIENT_DATA)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-4">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default ClientIdTable
