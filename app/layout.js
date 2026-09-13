import './globals.css'

export const metadata = {
  title: 'Catálogos',
  description: 'Consulta y descarga nuestros catálogos en PDF.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
