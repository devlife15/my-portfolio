import { useState } from "react";
import ParticleNetwork from "./components/ParticleNetwork";
import PortfolioPage from "./components/PortfolioPage";
import Preloader from "./components/PreLoader";
import FloatingASCII from "./components/FlotingASCII";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="relative min-h-screen bg-black text-white">
          <div className="absolute inset-0 z-0">
            <FloatingASCII />
          </div>
          <div className="relative z-10">
            <PortfolioPage isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
