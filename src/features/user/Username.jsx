import { useSelector } from "react-redux"

function Username() {
    const username = useSelector(store => store.user.userName)
    if(!username) return
    return (
        <div className="hidden text-base font-semibold md:block">
            {username}
        </div>
    )
}

export default Username
