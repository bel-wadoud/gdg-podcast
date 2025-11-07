import About from "@/components/common/About";
import Features from "@/components/common/Features";
import Explore from "@/components/layout/Explore";
import Header from "@/components/layout/Header";
import Voices from "@/components/layout/Voices";
import Footer from "@/components/layout/Footer";

function Landing() {
  return (
    <>
      {/* // Header Section */}
      <Header />
      {/* // Explore section  */}
      <Explore />
      {/* // About Section */}
      <About />
      <Features />
      {/* // Features Section */}
      {/* // Podcast Section */}
      {/* // Categories Section */}
      {/* // Voices Section */}
      <Voices />
      {/* // Footer Section */}
      <Footer />
    </>
  );
}

export default Landing;
