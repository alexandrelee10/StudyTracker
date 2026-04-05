import React from 'react'
import { getCurrentUser } from '../lib/auth'
import { useRouter } from 'next/navigation';

const DashboardPage = async () => {
  const user = await getCurrentUser();
  const router = useRouter();

  if (!user) {
    router.push("/sign-up")
  }
  
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage