import React, { useState, useEffect } from 'react';
import { getAllMerchandise } from './Database'

function PopUp(props) {
    const { total_gross, soft_gross, hard_gross, cc_fee, soft_net, hard_net, casino_owed_soft, casino_owed_hard, total_casino_owed, band_revenue } = props.results;
    const [grossPerItem, setGrossPerItem] = useState([]);

      const { handleClose } = props;

      const fetchData = async () => {
        const data = await getAllMerchandise();

        const response = await fetch('http://mymerchcalc4you.com/api/gross_per_item', {
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
            <tr>
              <th>Tax</th>
              <td>6.3%</td>
            </tr>
            <tr>
              <th>SE Fee</th>
              <td>$95</td>
            </tr>
            <tr>
              <th>Gross Per Item</th>
              <td>{grossPerItem.join(' + ')}</td>
            </tr>
            <tr>
              <th>Total Gross</th>
              <td>{total_gross}</td>
            </tr>
            <tr>
              <th>Total Soft Gross</th>
              <td>{soft_gross}</td>
            </tr>
            <tr>
              <th>Total Hard Gross</th>
              <td>{hard_gross}</td>
            </tr>
            <tr>
              <th>Credit Card Fee</th>
              <td>{cc_fee}</td>
            </tr>
            <tr>
              <th>Total Soft Net</th>
              <td>({soft_gross} / 1.063) - {cc_fee} - 95 = {soft_net}</td>
            </tr>
            <tr>
              <th>Total Hard Net</th>
              <td>{hard_gross} / 1.063 = {hard_net}</td>
            </tr>
            <tr>
              <th>Total Soft Owed Casino</th>
              <td>{soft_net} * .2 = {casino_owed_soft}</td>
            </tr>
            <tr>
              <th>Total Hard Owed Casino</th>
              <td>{hard_net} * .1 = {casino_owed_hard}</td>
            </tr>
            <tr>
              <th>Total Owed Casino</th>
              <td>{casino_owed_soft} + {casino_owed_hard} = {total_casino_owed}</td>
            </tr>
            <tr>
              <th>Band Revenue Received</th>
              <td>{total_gross} / 1.063 - {total_casino_owed} = {band_revenue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PopUp;
