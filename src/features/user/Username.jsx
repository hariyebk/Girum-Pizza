import { useSelector } from "react-redux"

function Username() {
    const name = useSelector(store => store.user.userName)
    if(!name) return
    return (
        <div className="hidden text-base font-semibold md:block">
            {name}
        </div>
    )
}

export default Username
