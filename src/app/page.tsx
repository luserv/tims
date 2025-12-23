import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import InfoBanner from "@/components/landingpage/InfoBanner";
import VisionMisionBanner from "@/components/landingpage/visionMisionBanner";

export default function Home() {

  return (
    <div className="font-sans items-center w-screen justify-items-center bg-white text-black dark:bg-black dark:text-white absolute">
     
        <Header />
        <VisionMisionBanner />
        <InfoBanner/>
        <Footer/>

    </div>
  );
}
