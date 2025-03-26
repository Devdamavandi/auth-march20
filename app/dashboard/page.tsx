

import { auth } from "@/auth"
import DashboardClient from "@/components/dashboard/dashboard-client"


const DashboardPage = async () => {

    const session = await auth()
    const user = session?.user

    return user ? <DashboardClient user={{
        name: user.name || undefined,
        email: user.email || undefined,
        role: user.role || undefined
    }} /> : <div>Loading...</div>
}


export default DashboardPage