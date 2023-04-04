import React, { useState, useEffect } from 'react';
import { getAllMerchandise } from './Database'

function PopUp(props) {
    const { band_revenue } = props.results;
    const [grossPerItem, setGrossPerItem] = useState({
        gross_per_item: 0
      });

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

    setGrossPerItem({
        gross_per_item: json.toFixed(2)
    });
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
              <td>Gross per Item</td>
              {/*need to find a way to display gross_per_item in the table because it is an array*/}
              <td>{grossPerItem.gross_per_item}</td>
            </tr>
            <tr>
              <td>Total Gross</td>
            </tr>
            <tr>
              <td>Total Soft Gross</td>
            </tr>
            <tr>
              <td>Total Hard Gross</td>
            </tr>
            <tr>
              <td>Credit Card Fee</td>
            </tr>
            <tr>
              <td>Total Soft Net</td>
            </tr>
            <tr>
              <td>Total Hard Net</td>
            </tr>
            <tr>
              <td>Total Soft Owed Casino</td>
            </tr>
            <tr>
              <td>Total Hard Owed Casino</td>
            </tr>
            <tr>
              <td>Total Owed Casino</td>
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
