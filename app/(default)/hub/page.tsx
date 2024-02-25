
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import RouterUser from "@/components/ui/routerUser";
import LoaderComponent from "@/components/ui/loader";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      return  (
        <div>
          <RouterUser session={session.user.image} id={session.user.email} />
          <LoaderComponent/>
        </div>
      )
    }
    return <h2>Please login to see this admin page</h2>
};  