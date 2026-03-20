import { headers } from 'next/headers'
import LoginClient from './LoginClient'

export default async function LoginPage() {
  const headersList = await headers()
  const isChina = headersList.get('x-china-user') === 'true'
  const country = headersList.get('x-user-country') ?? 'US'

  return <LoginClient isChina={isChina} country={country} />
}
