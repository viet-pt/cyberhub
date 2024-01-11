import Link from "next/link";

function Error({ statusCode }) {
  return (
    <div className="bg-gradient-to-b from-white to-blue-200">
      <div className="flex justify-center pt-8 flex-col min-h-screen">
        <p className='medium mt-8 mx-3 text-xl text-center text-gray-700'>
          {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
        </p>
        <Link href="/" className="bg-primary text-white flex items-center px-4 py-2 mt-6 bold rounded text-lg mx-auto">
          Go to home page
        </Link>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
}

export default Error;