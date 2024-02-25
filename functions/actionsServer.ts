'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(url: string) {
  redirect(`/user`)
}

// export async function getCurrentUser() {
//   const user = localStorage.getItem('user');
//   return user
// }

