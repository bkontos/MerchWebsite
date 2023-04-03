import './App.css';
import { useState } from 'react';
import MerchTable from './components/MerchTable'
import ResultsTable from './components/ResultsTable';
import PopUp from './components/PopUp';

function App() {
  const [dataUpdated, setDataUpdated] = useState(false);

  const handleDataUpdated = () => {
    setDataUpdated(!dataUpdated);
  };

  return (
    <div>
      <MerchTable onDataUpdated={handleDataUpdated} />
      <ResultsTable dataUpdated={dataUpdated} />
      <PopUp />
    </div>
  );
}

export default App;
