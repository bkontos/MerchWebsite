import './App.css';
import MerchTable from './components/MerchTable'
import ResultsTable from './components/ResultsTable';

function App() {

  return (
      <div className="app-container">
        <h1>Talking Stick Resort Merch</h1>
      <MerchTable />
      <ResultsTable />
    </div>
  );
}

export default App;
