import gdg_logo from '@/assets/images/GDGLogo.png';
import twitterx from '@/assets/icons/twitterx.svg';
import youtube from '@/assets/icons/youtube.svg';
import linkedin from '@/assets/icons/linkedin.svg';
import instagram from '@/assets/icons/instagram.svg';
import github from '@/assets/icons/github.svg';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 bg-white md:mt-12">
            <div className="max-w-7xl mx-auto px-6 py-8 ">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
                    {/* logo */}
                    <div className="md:w-1/4">
                        <img src={gdg_logo} alt="GDG Algiers" className="h-10 w-auto" />
                    </div>

                    {/* CTA text */}
                    <div className="text-center  md:w-1/4">
                        <h3 className="text-lg font-semibold">Dive in Our Community, and Learn Something New Every Day!</h3>
                    </div>
                </div>
                 {/*  social icons */}
                <div className="flex flex-col items-center ">
                    <div className="flex items-center gap-4">
                        {/* socialmedia.svg is a small grouped icon set; wrap for future links */}
                        <a href="https://x.com/gdg_algiers?lang=en" aria-label="X / Twitter" className="block">
                            <img src={twitterx} alt="Twitter" className="h-6 w-6" />
                        </a>
                        <a href="https://www.youtube.com/@gdgalgiers9433" aria-label="YouTube" className="block">
                            <img src={youtube} alt="YouTube" className="h-6 w-6" />
                        </a>
                        <a href="https://www.linkedin.com/company/gdg-algiers/" aria-label="LinkedIn" className="block">
                            <img src={linkedin} alt="LinkedIn" className="h-6 w-6" />
                        </a>
                        <a href="https://www.instagram.com/gdg_algiers/" aria-label="Instagram" className="block">
                            <img src={instagram} alt="Instagram" className="h-6 w-6" />
                        </a>
                        <a href="https://github.com/GDGAlgiers" aria-label="GitHub" className="block">
                            <img src={github} alt="GitHub" className="h-6 w-6" />
                        </a>
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-500">© {year} GDG Algiers. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;