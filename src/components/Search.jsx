import {useState} from "react"
import {useNavigate} from "react-router-dom"
function Search() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!query) return
        navigate(`/order/${query}`)
        setQuery("")
    }
    return (
        <form onSubmit = {handleSubmit} className="my-4">
            <input placeholder = "search orders by id" className="w-26 bg-yellow-100 rounded-full px-4 py-2 text-sm placeholder:text-stone-400 sm:focus:w-72 sm:w-64 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-offset-2 focus:ring-opacity-50" value = {query} onChange = {e => setQuery(e.target.value)} />
        </form>
    )
}

export default Search
