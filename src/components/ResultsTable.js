import React, { useState, useEffect } from "react";

function ResultsTable() {
    const [loaded, setLoaded] = useState(null);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch(
          "https://sheetdb.io/api/v1/nc7krlodazbab?sheet=Calculation",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2",
            },
          }
        );
        const data = await response.json();
        setLoaded(data[0]); // set loaded to the second row of the response data array
      }
      fetchData();
    }, []);
    
    if (!loaded) {
      return <div>Loading data...</div>;
    }
    
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
              <td>{loaded.totalGross}</td>
              <td>{loaded.softGross}</td>
              <td>{loaded.hardGross}</td>
              <td>{loaded.ccFee}</td>
              <td>{loaded.totalSoftNet}</td>
              <td>{loaded.totalHardNet}</td>
              <td>{loaded.casinoOwedSoft}</td>
              <td>{loaded.casinoOwedHard}</td>
              <td>{loaded.totalCasinoOwed}</td>
              <td>{loaded.bandRevenue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    
}

export default ResultsTable;
