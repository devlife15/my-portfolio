import { useState } from "react";
import Terminal from "./components/Terminal";
import ScrambleText from "./components/ScrambleText";
import LoadingScreen from "./components/LoadingScreen";
import ParticleNetwork from "./components/ParticleNetwork";
import PortfolioPage from "./components/PortfolioPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const name = "Ayan Kumar";
  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="relative min-h-screen text-white">
          <ParticleNetwork />
          <PortfolioPage />
        </div>
      )}
    </>
  );
}

export default App;
