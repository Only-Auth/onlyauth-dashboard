import { FaRegCopy } from 'react-icons/fa6'
import { useToast } from '@/hooks/use-toast'

function CopyCTA({ clientId }: { clientId: string }) {
  const { toast } = useToast()
  return (
    <FaRegCopy
      className="cursor-pointer  text-gray-500 hover:text-gray-800"
      onClick={() => {
        navigator.clipboard.writeText(clientId)
        toast({
          description: 'Copied to Clipboard!',
        })
      }}
    />
  )
}

export default CopyCTA
