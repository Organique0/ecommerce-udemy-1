import NavBar from '@/components/navigation/NavBar'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import "./index.scss"
import { UserProvider } from '@/contexts/user.context'

const sans = Open_Sans({ subsets: ['latin'], })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <UserProvider>
          <NavBar />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}


