import './globals.css'
import './styles/phone-input.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import ClientLayout from '@/components/layout/ClientLayout'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | DECOMIZER',
    default: 'DECOMIZER - Here Style Meets Comfort',
  },
  description: 'Discover luxury bedding solutions at DECOMIZER. We offer premium quality bedsheets, comforters, and bedding accessories for your perfect night\'s sleep.',
  keywords: ['bedding', 'luxury bedding', 'bedsheets', 'comforters', 'home decor', 'DECOMIZER','Decomizer bedsheets','Decomizer comforters','Decomizer bedding accessories','luxury bedding products','luxury bedding accessories','luxury bedding solutions','Decomizer comforter set','Decomizer Fitted Bedsheets','Decomizer Elastic Fitted Bedsheets'],
  authors: [{ name: 'DECOMIZER' }],
  creator: 'DECOMIZER',
  publisher: 'DECOMIZER',
  icons: {
    icon: [{ url: '/images/brand-logo.png', sizes: '32x32', type: 'image/png' }],
    shortcut: [{ url: '/images/brand-logo.png', sizes: '16x16', type: 'image/png' }],
    apple: [{ url: '/images/brand-logo.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'icon', url: '/images/brand-logo.png', sizes: '16x16', type: 'image/png' },
      { rel: 'icon', url: '/images/brand-logo.png', sizes: '32x32', type: 'image/png' },
      { rel: 'apple-touch-icon', url: '/images/brand-logo.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
