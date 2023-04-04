import React, { useState, useEffect } from 'react';
import { getAllMerchandise } from './Database'

function PopUp(props) {
    const { total_gross, soft_gross, hard_gross, cc_fee, soft_net, hard_net, casino_owed_soft, casino_owed_hard, total_casino_owed, band_revenue } = props.results;
    const [grossPerItem, setGrossPerItem] = useState([]);

      const { handleClose } = props;

      const fetchData = async () => {
        const data = await getAllMerchandise();

        const response = await fetch('http://localhost:5000/api/gross_per_item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    setGrossPerItem(json.map(gross => parseFloat(gross).toFixed(2)));
};

useEffect(() => {
    fetchData();
}, []);


  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
        <h2>Calculations</h2>
        <table>
          <tbody>
          {grossPerItem.map((gross, index) => (
              <tr key={index}>
                <td>Gross per Item {index + 1}</td>
                <td>{gross}</td>
              </tr>
            ))}
            <tr>
              <td>Total Gross</td>
              <td>{total_gross}</td>
            </tr>
            <tr>
              <td>Total Soft Gross</td>
              <td>{soft_gross}</td>
            </tr>
            <tr>
              <td>Total Hard Gross</td>
              <td>{hard_gross}</td>
            </tr>
            <tr>
              <td>Credit Card Fee</td>
              <td>{cc_fee}</td>
            </tr>
            <tr>
              <td>Total Soft Net</td>
              <td>{soft_net}</td>
            </tr>
            <tr>
              <td>Total Hard Net</td>
              <td>{hard_net}</td>
            </tr>
            <tr>
              <td>Total Soft Owed Casino</td>
              <td>{casino_owed_soft}</td>
            </tr>
            <tr>
              <td>Total Hard Owed Casino</td>
              <td>{casino_owed_hard}</td>
            </tr>
            <tr>
              <td>Total Owed Casino</td>
              <td>{total_casino_owed}</td>
            </tr>
            <tr>
              <td>Band Revenue Received</td>
              <td>{band_revenue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PopUp;
