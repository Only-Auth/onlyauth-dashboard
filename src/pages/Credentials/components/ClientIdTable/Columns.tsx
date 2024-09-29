import { ColumnDef } from '@tanstack/react-table'
import { MdModeEditOutline } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { ArrowUpDown } from 'lucide-react'
import CopyCTA from '../../../../components/CopyCTA'
import { Link } from 'react-router-dom'
import { ClientId } from '@/types/types'

export const columns: ColumnDef<ClientId>[] = [
  {
    header: 'App Name',
    accessorKey: 'name',
    cell: ({ row }) => {
      const name: string = row.getValue('name')
      const id: string = row.original.id
      return (
        <Link to={`client/${id}`} className="text-blue-700 underline">
          {name}
        </Link>
      )
    },
  },
  {
    header: 'Client ID',
    accessorKey: 'clientId',
    cell: ({ row }) => {
      const clientId: string = row.getValue('clientId')
      const formatted = `${clientId.slice(0, 20)}...`

      return (
        <div className="flex items-center gap-x-2">
          <span>{formatted}</span>
          <CopyCTA text={clientId} />
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start">
          Created At
          <ArrowUpDown
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-2 h-4 w-4 cursor-pointer"
          />
        </div>
      )
    },
    cell: ({ row }) => {
      const createdAt: number = row.getValue('createdAt')
      return <span>{new Date(createdAt * 1000).toDateString()}</span>
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      const client = row.original
      return (
        <div className="flex items-center justify-start gap-x-2">
          <MdModeEditOutline
            size={18}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => console.log('Edit', client)}
          />
          <MdDelete
            size={18}
            className="cursor-pointer text-gray-600 hover:text-red-500"
            onClick={() => console.log('Delete', client)}
          />
        </div>
      )
    },
  },
]
