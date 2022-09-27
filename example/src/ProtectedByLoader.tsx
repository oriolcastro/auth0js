import { useLoaderData } from 'react-router-dom'

export default function ProtectedByLoader() {
  const loaderData = useLoaderData()

  return (
    <div>
      {`${loaderData} This route is protected by its loader, you will never see this unless you are
      authenticated`}
    </div>
  )
}
