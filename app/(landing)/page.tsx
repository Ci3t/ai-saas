import { HomeContent } from "@/components/HomeContent";
import { HomeHero } from "@/components/HomeHero";
import { HomeNav } from "@/components/HomeNav";

const Home = () => {
  return (
    <div className="h-full">
      <HomeNav />
      <HomeHero />
      {/* <HomeContent /> */}
    </div>
  );
};

export default Home;
