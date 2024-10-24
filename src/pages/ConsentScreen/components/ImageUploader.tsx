import LogoPlaceholder from '@/assets/logo-placeholder.jpg'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

function ImageUploader({
  src,
  loading,
  selectLogo,
}: {
  src: string | undefined | null
  loading: boolean
  selectLogo: ({
    src,
    file,
  }: {
    src: string | null
    file: File | undefined
  }) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileSelect() {
    fileRef?.current?.click()
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <img
        className="h-[150px] w-[150px] object-cover bg-gray-100 rounded-lg"
        src={src ?? LogoPlaceholder}
      />

      <input
        ref={fileRef}
        onChange={(event) => {
          if (!event.target.files) return
          const selectedFile = event.target.files[0]
          console.log(URL.createObjectURL(event.target.files[0]))
          selectLogo({
            src: URL.createObjectURL(selectedFile),
            file: selectedFile,
          })
        }}
        hidden
        type="file"
      />
      <div className="flex gap-2 justify-end mt-2">
        <Button
          type="button"
          variant="secondary"
          disabled={src === null || loading}
        >
          Remove
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleFileSelect}
          disabled={loading}
        >
          {src === null ? 'Add logo ' : 'Choose Another logo'}
        </Button>
      </div>
    </div>
  )
}

export default ImageUploader
