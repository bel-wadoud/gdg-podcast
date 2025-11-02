import logo from "../../assets//images/logo.png";

function Header (){
    return (
        <>
            <header className=" flex flex-row items-center justify-between pt-4 text-black ">
                {/* logo */}
                <div className="">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-auto h-10 sm:h-14 md:h-20 lg:h-24 xl:h-28 inline-block mr-2 object-contain"
                    />
                </div>
                {/* sections  */}
                <div className="hidden md:flex flex-row gap-8 text-lg">
                    {/* Top Podcast */}
                    <div>
                        <button className="bg-red-400 font-semibold px-4 py-2 rounded-lg mr-4 hover:bg-red-500 transition duration-300">Top Podcast</button>
                    </div>                   
                    {/* Voices */}
                    <div>
                        <button className="bg-amber-200 font-semibold px-4 py-2 rounded-lg mr-4 hover:bg-amber-300 transition duration-300">Voices</button>
                    </div>  
                    {/* About */}
                    <div>
                        <button className="bg-green-300 font-semibold px-4 py-2 rounded-lg mr-4 hover:bg-green-400 transition duration-300">About</button>
                    </div>  
                </div>
                {/* login & sign up buttons*/}
                <div className=''>
                    <button className='bg-sky-300 font-semibold px-4 py-2 rounded-lg mr-4 hover:bg-sky-400 transition duration-300'>Login</button>
                    <button className='bg-sky-300 font-semibold px-4 py-2 rounded-lg mr-4 hover:bg-sky-400 transition duration-300'>Sign Up</button>
                </div>

            </header>
        </>
    );
}

export default Header;