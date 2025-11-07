import Logo from '@/assets/images/logo.png';
import Search from '@/assets/icons/search.svg';
import { Link } from 'react-router-dom';
function Header () {
    return (
        <>
            <header className="podcast-player-header border-b-2 border-gray-300">
                {/* container that contains image , sections , search bar  */}
                <div className="header-container flex items-center justify-between py-4 px-2">
                    {/* image  */}
                    <div className="header-image shrink-0 ">
                        <img src={Logo} alt="Podcast Logo" className="w-auto h-10 sm:h-14 md:h-20 lg:h-24 xl:h-28 inline-block mr-2 object-contain"/>
                    </div>
                    {/* sections  */}
                        <ul className="nav-list hidden md:flex flex-row gap-8 text-lg">
                            <li className="nav-item"><Link to="/podcast" className="nav-link bg-red-400 px-6 py-2 border border-black rounded-2xl mr-4 hover:bg-red-500 transition duration-300">Podcasts</Link></li>
                            <li className="nav-item"><Link to="/contact" className="nav-link bg-amber-200 px-6 py-2  border border-black rounded-2xl mr-4 hover:bg-amber-300 transition duration-300">Contact</Link></li>
                            <li className="nav-item"><Link to="/profile" className="nav-link bg-green-300 px-6 py-2  border border-black rounded-2xl mr-4 hover:bg-green-400 transition duration-300">Profile</Link></li>
                        </ul>
                    {/* search bar */}
                    <div className="header-search flex items-center gap-2">
                        {/* hidden checkbox used to toggle the search on very small screens */}
                        <input id="search-toggle" type="checkbox" className="sr-only peer" />

                        {/* icon-only toggle visible on xs (hidden on sm+) */}
                        <label htmlFor="search-toggle" className="sm:hidden p-2 bg-sky-300 rounded-full cursor-pointer border border-black hover:bg-sky-400 transition">
                            <img src={Search} alt="Open search" className="w-5 h-5"/>
                        </label>

                        {/* search box:
                                - hidden on xs unless the toggle is checked (peer-checked:flex)
                                - visible and responsive on sm and up
                                - width adapts across breakpoints
                        */}
                        <div className="hidden peer-checked:flex sm:flex items-center bg-sky-300 border border-black rounded-full px-3 py-1 transition-all duration-300 w-full sm:w-1/2 md:w-96">
                            <img src={Search} alt="Search" className="w-5 h-5 mr-3 hidden sm:inline"/>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-transparent placeholder-black text-sm md:text-lg px-1 py-2"
                                aria-label="Search"
                            />
                        </div>
                    </div>
                </div>
                {/* container that contains sliding lists ( categories , guest , format ) */}
                <div className=' flex flex-row items-start justify-around gap-6 overflow-x-auto pb-2 '>
                    {/* Categories list  */}
                    <div className="flex gap-4">
                        {/* Categories */}
                        <div className="group relative ">
                            <div className="bg-sky-300 cursor-pointer px-6 py-2">
                                <h5 className="text-lg text-center ">categories</h5>
                            </div>

                            {/* hidden by default, expands and slides into view on hover */}
                            <div className="overflow-hidden max-h-0 group-hover:max-h-48 transition-[max-height] duration-300 ease-out">
                                <ul className="bg-sky-400 mt-2 p-2 space-y-1 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover: cursor-pointer">
                                    <li className="px-2 py-1 rounded hover:bg-sky-500">category 1</li>
                                    <li className="px-2 py-1 rounded hover:bg-sky-500">category 2</li>
                                    <li className="px-2 py-1 rounded hover:bg-sky-500">category 3</li>
                                </ul>
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="group relative">
                            <div className="bg-red-400 px-6 py-2 cursor-pointer">
                                <h5 className="text-lg text-center ">guests</h5>
                            </div>

                            <div className="overflow-hidden max-h-0 group-hover:max-h-48 transition-[max-height] duration-300 ease-out">
                                <ul className="bg-red-500 mt-2 p-2 space-y-1 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover: cursor-pointer">
                                    <li className="px-2 py-1 rounded hover:bg-red-600">guest 1</li>
                                    <li className="px-2 py-1 rounded hover:bg-red-600">guest 2</li>
                                    <li className="px-2 py-1 rounded hover:bg-red-600">guest 3</li>
                                </ul>
                            </div>
                        </div>

                        {/* Format */}
                        <div className="group relative">
                            <div className="bg-amber-200 px-6 py-2 cursor-pointer">
                                <h5 className="text-lg text-center ">format</h5>
                            </div>

                            <div className="overflow-hidden max-h-0 group-hover:max-h-48 transition-[max-height] duration-300 ease-out">
                                <ul className="bg-amber-400 mt-2 p-2 space-y-1 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover: cursor-pointer" >
                                    <li className="px-2 py-1 rounded hover:bg-amber-500 ">Video</li>
                                    <li className="px-2 py-1 rounded hover:bg-amber-500">Audio</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;