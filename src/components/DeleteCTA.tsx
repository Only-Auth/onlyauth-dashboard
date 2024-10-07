import { MdDelete } from 'react-icons/md'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
} from './ui/alert-dialog'
import { deleteApplication } from '@/services/AppServices'
import { toast } from '@/hooks/use-toast'

function DeleteCTA({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['applications'],
        exact: true,
      })
      toast({ description: 'Application deleted' })
    },
    onError: (error) => {
      toast({ title: 'Something went wrong !', description: error.message })
    },
  })
  function handleDelete() {
    mutate(id)
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <MdDelete
          size={18}
          className="cursor-pointer text-gray-600 hover:text-red-500"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Client?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to delete this?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleDelete} className="bg-red-700">
            Delete
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCTA
