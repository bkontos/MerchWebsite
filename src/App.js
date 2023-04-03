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
      <MerchTable onDataUpdated={handleDataUpdated} />
      <ResultsTable dataUpdated={dataUpdated} />
    </div>
  );
}

export default App;
