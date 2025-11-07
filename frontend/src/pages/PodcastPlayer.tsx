import Header from "@/components/layout/podcastplayer/Header";
import Footer from "@/components/layout/Footer";
import Main from "@/components/layout/podcastplayer/Main";
import { useParams } from "react-router-dom";

function PodcastPlayer() {
    const params = useParams();
    const id = params.id;
    return (
        <>
        {/* header section */}
        <Header/>
        {/* podcast player section */}
        <Main/> 
        {/* footer section */}
        <Footer/>
        </>
    )
}

export default PodcastPlayer;