import React from 'react';

function PopUp(props) {
  //const { results } = props;
  //const { gross_per_item, total_gross, soft_gross, hard_gross, cc_fee, soft_net, hard_net, casino_owed_soft, casino_owed_hard, total_casino_owed, band_revenue } = results;

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={props.handleClose}>Close</button>
        <h2>Calculations</h2>
        <table>
          <tbody>
            <tr>
              <td>Gross per Item</td>
              {/*<td>{gross_per_item}</td>*/}
            </tr>
            <tr>
              <td>Total Gross</td>
              {/*<td>{total_gross}</td>*/}
            </tr>
            <tr>
              <td>Total Soft Gross</td>
              {/*<td>{soft_gross}</td>*/}
            </tr>
            <tr>
              <td>Total Hard Gross</td>
              {/*<td>{hard_gross}</td>*/}
            </tr>
            <tr>
              <td>Credit Card Fee</td>
              {/*<td>{cc_fee}</td>*/}
            </tr>
            <tr>
              <td>Total Soft Net</td>
              {/*<td>{soft_net}</td>*/}
            </tr>
            <tr>
              <td>Total Hard Net</td>
              {/*<td>{hard_net}</td>*/}
            </tr>
            <tr>
              <td>Total Soft Owed Casino</td>
              {/*<td>{casino_owed_soft}</td>*/}
            </tr>
            <tr>
              <td>Total Hard Owed Casino</td>
              {/*<td>{casino_owed_hard}</td>*/}
            </tr>
            <tr>
              <td>Total Owed Casino</td>
              {/*<td>{total_casino_owed}</td>*/}
            </tr>
            <tr>
              <td>Band Revenue Received</td>
              {/*<td>{band_revenue}</td>*/}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PopUp;
