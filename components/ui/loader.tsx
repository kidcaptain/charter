"use client"
import loader from '@/public/images/loader.svg';
import Image from 'next/image';
 
export default function LoaderComponent() {

    return (
       <div className="z-50 fixed w-full top-0 left-0 h-full bg-white flex items-center justify-center">
            <div>
            <Image src={loader} className='animate-spin m-auto' width={25} height={25} alt='Loader image' />
            <p className='text-center uppercase text-blue-500 text-2xl'>Veuillez patientez</p>
            </div>
       </div>
    )

}