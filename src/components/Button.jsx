import { Link } from "react-router-dom"

function Button({children, disabled, to, type, onClick}) {
    const className = "text-sm font-semibold uppercase inline-block  tracking-wide rounded-full  transition-colors duration-300 focus:outline-none disabled:cursor-not-allowed"

    const style = {
        primary: className + "  bg-yellow-400 text-stone-700 hover:bg-yellow-300 focus:ring  focus:ring-yellow-300 focus:ring-offset-2  px-4 py-3 md:px-6 md:py-4",
        small: className + "  bg-yellow-400 text-stone-700 hover:bg-yellow-300 focus:ring  focus:ring-yellow-300 focus:ring-offset-2  px-4 py-3 text-sm font-medium",
        secondary: className + "  border-2 text-sm text-stone-500 hover:bg-stone-300 hover:text-stone-700 border-stone-400 px-4 py-2.5 md:px-6 md:py-3.5",
        round : className + "  bg-yellow-400 text-stone-700 hover:bg-yellow-300 focus:ring  focus:ring-yellow-300 focus:ring-offset-2  px-2.5 py-1 text-sm font-meduim"
    }
    if(to) 
        return <Link to = {to} className= {style[type]}>
            {children}
        </Link>
    

    if(onClick){
        return (
            <button onClick = {onClick} className = {style[type]}  disabled = {disabled}>
                {children}
            </button>
        )
    }
    return (
        <button className = {style[type]} disabled = {disabled}>
            {children}
        </button>
    )
}

export default Button
