import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserAccountNav from "./userAccountNav";

export default async function Header() {
    const session = await getServerSession(authOptions);
    return (
        <header className=" w-full top-0 left-0 z-10 border-b-2  bg-white">
            <div className=" mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">
                    <nav className="hidden md:flex md:grow">
                        <ul className="flex grow justify-end flex-wrap items-center">
                            {
                                session?.user ? (
                                    <li className="flex flex-row items-center">
                                        <div title="Voir son profil">
                                            <span className=" text-gray-600 hover:text-gray-700 px-4 py-3 text-lg  flex items-center transition duration-150 ease-in-out" >
                                            {session?.user?.name}
                                            </span>
                                        </div>
                                        <div>
                                           <UserAccountNav />
                                        </div>
                                    </li>
                                ) : (
                                    <Link href={"/signin"} className="text-white  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-red-300  rounded-sm text-sm p-2 px-5 text-center">S'authentifier</Link>
                                )
                           }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}