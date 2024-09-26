import { Link } from 'react-router-dom'
function CardLayout({
  children,
  header,
  ctaText,
  ctaLink,
  ctaDescription,
}: {
  children: React.ReactNode
  header: string
  domain: string
  ctaText: string
  ctaLink: string
  ctaDescription: string
}) {
  return (
    <div className="bg-white w-full md:max-w-md max-w-sm px-4 py-6 rounded-2xl flex flex-col items-center justify-center">
      <div className="text-md my-2">
        Sign in with <span className="font-lobster">OnlyAuth</span>
      </div>
      <div className="flex flex-col items-center justify-center my-2 space-y-2">
        <p className="text-2xl font-medium">{header}</p>
      </div>
      {children}
      <p className="text-sm">
        {ctaDescription}{' '}
        <Link to={ctaLink} className="font-semibold text-blue-600">
          {ctaText}
        </Link>
      </p>
    </div>
  )
}

export default CardLayout
