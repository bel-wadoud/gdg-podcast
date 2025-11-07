function Main() {
 return (
    <>
        <div className="grid grid-cols-2 grid-rows-4 gap-x-[50px] gap-y-[35px] w-full h-full">
            <div className="bg-blue-400 row-start-1 row-end-3 col-start-1 col-end-2 rounded-2xl shadow-md">
                {/* video player  */}
            </div>
            <div className="bg-green-400 row-start-3 row-end-5 col-start-1 col-end-2 rounded-2xl shadow-md">
                {/* descrtption */}
            </div>
            <div className="bg-red-400 row-start-1 row-end-5 col-start-2 col-end-3 rounded-2xl shadow-md">
                {/* comments section */}
            </div>
        </div>
    </>
 )
}

export default Main;