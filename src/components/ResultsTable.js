import * as calculations from './backend/calculations';
import { ccData } from './MerchTable';
    
function ResultsTable() {
  async function getTotalGross(data) {
    const response = await fetch('/api/total_gross', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  }
  
  // Call getTotalGross with your data and handle the result
  const data = [...]; // Your data from the database
  getTotalGross(data).then(result => {
    console.log(result);
  });
  
    /*const totalGross = calculations.get_total_gross(data);
    const softGross = calculations.get_soft_gross(data);
    const hardGross = calculations.get_hard_gross(data);
    const softNet = calculations.get_soft_net(data);
    const hardNet = calculations.get_hard_net(data);
    const casinoOwedSoft = calculations.get_casino_owed_soft(data);
    const casinoOwedHard = calculations.get_casino_owed_hard(data);
    const totalCasinoOwed = calculations.get_total_casino_owed(data);
    const bandRevenue = calculations.get_band_revenue(data);*/

    
    
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Total Gross</th>
              <th>Total Soft Gross</th>
              <th>Total Hard Gross</th>
              <th>Credit Card Fee</th>
              <th>Total Soft Net</th>
              <th>Total Hard Net</th>
              <th>Total Soft Owed Casino</th>
              <th>Total Hard Owed Casino</th>
              <th>Total Owed Casino</th>
              <th>Band Revenue Received</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{getTotalGross}</td>
              <td>{getSoftGross}</td>
              <td>{getHardGross}</td>
              <td>{ccData.fee}</td>
              <td>{getSoftNet}</td>
              <td>{getHardNet}</td>
              <td>{getCasinoOwedSoft}</td>
              <td>{getCasinoOwedHard}</td>
              <td>{getTotalCasinoOwed}</td>
              <td>{getBandRevenue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    
}

export default ResultsTable;
