import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

import AppDetailsForm from './components/AppDetailsForm'
import ConsentDetails from './components/ConsentDetailsForm'

function FormAccordionItem({
  title,
  children,
  isOpen,
}: {
  title: string
  children: React.ReactNode
  isOpen: boolean
}) {
  return (
    <>
      <div className="w-[400px]">
        <div className="text-2xl flex items-center justify-between">
          <span>{title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isOpen && <div className="pl-4 pt-4 ">{children}</div>}
      </div>
    </>
  )
}

function CreateCredentials() {
  const [openFormIndex, setOpenFormIndex] = useState(0)
  return (
    <>
      <div className="flex items-center gap-x-4">
        <Link to={'..'}>
          <IoArrowBack size={20} />
        </Link>
        <p className="text-2xl font-semibold">Create Client</p>
      </div>
      <div className="sm:p-10 p-4 flex flex-col gap-5">
        <FormAccordionItem title="App Details" isOpen={openFormIndex === 0}>
          <AppDetailsForm onSave={() => setOpenFormIndex(1)} />
        </FormAccordionItem>
        <FormAccordionItem
          title="Consent Screen Details"
          isOpen={openFormIndex === 1}
        >
          <ConsentDetails
            onSubmit={() => {}}
            handleBack={() => {
              setOpenFormIndex(0)
            }}
          />
        </FormAccordionItem>
      </div>
    </>
  )
}

export default CreateCredentials
