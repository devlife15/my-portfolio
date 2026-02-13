import { useState } from "react";
import PortfolioPage from "./components/PortfolioPage";
import Preloader from "./components/effects/PreLoader";
import FloatingASCII from "./components/effects/FloatingASCII";
import SmoothScroll from "./components/effects/SmoothScroll";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <SmoothScroll>
          <div className="relative min-h-screen bg-black text-white">
            <div className="absolute inset-0 z-0">
              <FloatingASCII />
            </div>
            <div className="relative z-10">
              <PortfolioPage isLoading={isLoading} />
            </div>
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
