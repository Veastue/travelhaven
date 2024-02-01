import type { Metadata } from 'next'
import { Nunito} from 'next/font/google'
import './globals.css'
import ClientOnly from './components/ClientOnly'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TravelHaven',
  description: 'Welcome to TravelHaven, your ultimate destination for seamless travel experiences! Replicating the successful model of famous travel app, TravelHaven brings you a user-friendly platform that connects travelers with unique accommodations and unforgettable experiences around the world.',
  icons:{
    icon: 'https://res.cloudinary.com/dvda6isym/image/upload/v1706691481/Favicon_jxnlur.png',
    apple: 'https://res.cloudinary.com/dvda6isym/image/upload/v1706691481/Favicon_jxnlur.png'
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
      <html lang="en">
      <body className={font.className}>
          <ClientOnly>
            <ToasterProvider/>
            <SearchModal/>
            <RentModal/>
            <RegisterModal/>
            <LoginModal/>
            <Navbar currentUser={currentUser}/>
          </ClientOnly>
          <div className='pb-20 pt-28'>
            {children}
          </div>
        </body>
    </html>
  )
}
