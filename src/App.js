import './App.css';
import { useState } from 'react';
import MerchTable from './components/MerchTable'
import ResultsTable from './components/ResultsTable';

function App() {
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleDataUpdated = () => {
    setDataUpdated(!dataUpdated);
  };

  return (
    <div>
      <section className="hero">
        <h1>Welcome to the Merchandise Calculator</h1>
        <p>Get merch done quick</p>
      </section>
      <MerchTable onDataUpdated={handleDataUpdated} />
      <ResultsTable dataUpdated={dataUpdated} />
    </div>
  );
}

export default App;
