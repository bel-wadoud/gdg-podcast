import voice1 from '../../assets/images/voice1.png';
import voice2 from '../../assets/images/voice2.png';
import voice3 from '../../assets/images/voice3.png';
import leftarrow from '../../assets/icons/leftarrow.svg';
import rightarrow from '../../assets/icons/rightarrow.svg';
import microphone from '../../assets/icons/microphone.svg';

const voices = [
    { id: 1, name: 'David Kim', img: voice1, pill: 'bg-red-400 text-black' },
    { id: 2, name: 'Sara Mitchell', img: voice2, pill: 'bg-amber-200 text-black' },
    { id: 3, name: 'Marcus Rivera', img: voice3, pill: 'bg-green-200 text-black' },
];

function Voices() {
    return (
        <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-flex items-center justify-center gap-3">
                    Meet the Voices Behind the Mic
                    <img src={microphone} alt="microphone" className="w-6 h-6 hidden lg:inline-block" />
                </h2>

                <div className="relative">
                    {/* navigation arrows */}
                    <button
                        aria-label="previous"
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-6 bg-white rounded-full w-12 h-12 items-center justify-center shadow-md"
                    >
                        <img src={rightarrow} alt="left" className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-center">
                        {voices.map((v) => (
                            <div key={v.id} className="flex flex-col items-center">
                                        {/* inner avatar image */}
                                        <img src={v.img} alt={v.name} className="w-40 h-40 rounded-full object-cover bg-gray-200" />
                                {/* name pill */}
                                <div className={`mt-6 rounded-full px-8 py-3 ${v.pill} font-semibold`}>{v.name}</div>
                            </div>
                        ))}
                    </div>

                    <button
                        aria-label="next"
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-6 bg-white rounded-full w-12 h-12 items-center justify-center shadow-md"
                    >
                        <img src={leftarrow} alt="right" className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Voices;