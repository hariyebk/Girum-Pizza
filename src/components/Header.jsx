import {Link} from "react-router-dom"
import Search from "./Search"
import Username from "../features/user/username"
function Header() {
    return (
        <header className="flex flex-wrap items-center justify-between gap-7 bg-yellow-400 border-b border-stone-200 uppercase px-4 py-3">
            <Link to = "/" className="tracking-widest"> Fast React Pizza co.</Link> 
            <Search/>
            <Username />
        </header>
    )
}

export default Header
