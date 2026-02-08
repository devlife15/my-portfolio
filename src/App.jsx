import Terminal from "./components/Terminal";
import ScrambleText from "./components/ScrambleText";

function App() {
  const name = "Ayan Kumar";
  return (
    <>
      <Terminal />
      <ScrambleText text={name} />
    </>
  );
}

export default App;
