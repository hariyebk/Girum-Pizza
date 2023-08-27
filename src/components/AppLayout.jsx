import {Outlet} from "react-router-dom"
import CartOverview from "../features/cart/CartOverview"
import Header from "../components/Header"
import {useNavigation} from "react-router-dom"
import Loading from "./Loading"
import Username from "../features/user/Username"


function AppLayout() {
    const loadingState = useNavigation().state
    return (
        <div className = "grid h-screen grid-rows-[auto_1fr_auto]">
            {loadingState === "loading" && <Loading />}
            <Header Username={<Username />} />
            <div className="overflow-scroll">
                <main className="mx-auto max-w-3xl">
                    <Outlet />
                </main>
            </div>
            <CartOverview />
        </div>
    )
}

export default AppLayout
