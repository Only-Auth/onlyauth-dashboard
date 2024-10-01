import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa6'

function ApplicationTile({ title, id }: { title: string; id: string }) {
  return (
    <Link to={id}>
      <div className="bg-[#eeeef0] px-5 py-6 flex items-center justify-between rounded-xl transition-all hover:scale-[100.5%]">
        {title}
        <FaChevronRight />
      </div>
    </Link>
  )
}

export default ApplicationTile
