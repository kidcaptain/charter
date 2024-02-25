"use client";

import { SessionProvider, signOut } from "next-auth/react";
import UserLogout from "./userLogout";

const UserAccountNav = () => {


    const signOutUser = async (val: boolean) => {
            const signInData = await signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/signin`,
              });
        }

    return (<SessionProvider><UserLogout children={signOutUser} /></SessionProvider>
    )
};

export default UserAccountNav;
