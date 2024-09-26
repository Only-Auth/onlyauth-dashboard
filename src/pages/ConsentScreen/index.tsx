import ClientApp from './components/ClientApp'

const DUMMY_APPS = ['App 1', 'App 2', 'App 3', 'App 4', 'App 5']

function ConsentScreen() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Consent Screen</h1>
      <p className="text-gray-600">
        The consent screen is the first thing that your users will see when they
        log in to your app.
      </p>
      <div className=" flex flex-col mt-10 gap-y-4">
        {DUMMY_APPS.map((app, index) => (
          <ClientApp title={app} id={index.toString()} />
        ))}
      </div>
    </div>
  )
}

export default ConsentScreen
