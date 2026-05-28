import "./globals.css"
import LoadingProvider from "./providers/LoadingProvider";

export const metadata = {
  title: "Task Manager",
  description: "Task Management System"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  )
}