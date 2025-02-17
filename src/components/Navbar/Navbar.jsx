const Navbar = () => {
    return (
        <div className="flex flex-row justify-between items-center bg-purple-700 px-5 py-3">
            <a href="#" className="text-white text-2xl">
                TaskMan
            </a>
            <nav>
                <ul className="flex flex-row gap-4 mr-4 text-white">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">Your Tasks</li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar