"use client"
import { SessionProvider } from "next-auth/react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
    <main>
      <SessionProvider>
        {children}
      </SessionProvider>
    </main>
  )
}