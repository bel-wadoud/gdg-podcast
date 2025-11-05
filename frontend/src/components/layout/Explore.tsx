import podcast from "../../assets/images/podcast.png";

function Explore() {
  return (<>
        <div className="flex flex-col md:flex-row items-center justify-center my-8 md:my-5 gap-8">
        {/* description bloc */}
            <div className="md:w-1/2 px-4 py-10">
                {/* layered "paper" card: dark layer behind, light card on top */}
                <div className="relative">
                    {/* darker offset layer (shadow-like) */}
                    <div className="absolute inset-0 bg-green-800  -z-10 transform translate-x-6 translate-y-6"></div>

                    {/* main card */}
                    <div className="bg-green-300  p-8 hover:shadow-sm transition-shadow duration-200 relative z-10">
                        <h2 className="text-2xl  mb-4 font-medium text-center text-[#1B3A17]">Your Daily Dose of GDG Inspiration!</h2>
                        <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
                            Step into the world of GDG podcasts, a space made for students and tech enthusiasts who love learning.
                            Discover new concepts and experiences.
                            Small lessons today, big impact tomorrow.
                        </p>
                    </div>
                </div>
            </div>
        {/* image section */}
            <div className="md:w-1/2">
                <img
                    src={podcast}
                    alt="Podcast Illustration"
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>   
        <div className="flex justify-center md:justify-center">
            <button className="bg-amber-200 px-6 py-3 rounded-lg hover:bg-amber-400 transition duration-300">
                Start Exploring
            </button>
        </div>
    </>
  );
}

export default Explore;