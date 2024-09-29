import ClientIdTable from './components/ClientIdTable'

function Credentials() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Credentials</h1>
      <p className="text-gray-600">Manage your client IDs and secrets.</p>
      <div className="mt-10">
        <h1 className="text-xl font-semibold">Applications</h1>
        <ClientIdTable />
      </div>
    </div>
  )
}

export default Credentials
