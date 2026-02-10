import { useState } from "react";
import Terminal from "./components/Terminal";
import ScrambleText from "./components/ScrambleText";
import LoadingScreen from "./components/LoadingScreen";
import ParticleNetwork from "./components/ParticleNetwork";
import PortfolioPage from "./components/PortfolioPage";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/PreLoader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const name = "Ayan Kumar";
  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <SmoothScroll>
          <div className="relative min-h-screen text-white">
            <ParticleNetwork />
            <PortfolioPage />
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
