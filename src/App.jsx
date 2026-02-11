import { useState } from "react";
import ParticleNetwork from "./components/ParticleNetwork";
import PortfolioPage from "./components/PortfolioPage";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/PreLoader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="relative min-h-screen text-white">
          <ParticleNetwork />
          <PortfolioPage isLoading={isLoading} />
        </div>
      )}
    </>
  );
}

export default App;
