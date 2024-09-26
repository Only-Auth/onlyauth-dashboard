import { Link } from 'react-router-dom'

function ClientApp({ title, id }: { title: string; id: string }) {
  return (
    <div>
      <Link to={`client/: ${id}`}>{title}</Link>
    </div>
  )
}

export default ClientApp
