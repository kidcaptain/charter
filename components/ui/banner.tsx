export default function Banner(message: string) {
    return(
        <div className="bg-slate-900 fixed top-0 ">
            {message}
        </div>
    )
}