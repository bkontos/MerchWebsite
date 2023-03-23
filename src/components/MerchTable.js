import React, { useState, useEffect } from "react";

function MerchTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://sheetdb.io/api/v1/nc7krlodazbab",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2",
          },
        }
      );
      const data = await response.json();
      setData(data); // set loaded to the second row of the response data array this is a test
    }
    fetchData();
  }, []);
  

  const handleInputChange = (event, rowIndex, columnName) => {
    const updatedData = [...data];
    if (columnName === "isHard") {
      updatedData[rowIndex][columnName] = event.target.checked ? "true" : "false";
    } else {
      updatedData[rowIndex][columnName] = event.target.value;
    }
    setData(updatedData);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = [...data];
    updatedData.splice(rowIndex, 1);
    setData(updatedData);
  };

  const handleAddRow = () => {
    setData([...data, { item: "", size: "", price: "", count_in: "", count_out: "", comps: "", isHard: "" }]);
  };

  const handleSaveRow = async (rowIndex) => {
    const url = `https://sheetdb.io/api/v1/nc7krlodazbab/price/${data[rowIndex].price}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2",
      },
      body: JSON.stringify(data[rowIndex]),
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    setData([...data.slice(0, rowIndex), responseData[0], ...data.slice(rowIndex + 1)]);
  };
  //I think the best way to go about the POST/PATCH situation is to post a request, 
  //get the id's for that post request and then if the user does another submit, but the
  //id's match a previous post request then you do a PATCH instead

  const handleSubmit = async () => {
    const url = "https://sheetdb.io/api/v1/nc7krlodazbab";
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    const responseData = await response.json();
    setData(responseData);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Size</th>
            <th>Price</th>
            <th>Count In</th>
            <th>Count Out</th>
            <th>Comps</th>
            <th>Is it Hard</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input type="text" value={row.item} onChange={(event) => handleInputChange(event, rowIndex, "item")} />
              </td>
              <td>
                <input type="text" value={row.size} onChange={(event) => handleInputChange(event, rowIndex, "size")} />
              </td>
              <td className="price">
                <input type="number" value={row.price} onChange={(event) => handleInputChange(event, rowIndex, "price")} />
              </td>
              <td>
                <input type="number" value={row.count_in} onChange={(event) => handleInputChange(event, rowIndex, "count_in")} />
              </td>
              <td>
                <input type="number" value={row.count_out} onChange={(event) => handleInputChange(event, rowIndex, "count_out")} />
              </td>
              <td>
                <input type="number" value={row.comps} onChange={(event) => handleInputChange(event, rowIndex, "comps")} />
              </td>
              <td>
                <input type="checkbox" value={row.isHard} onChange={(event) => handleInputChange(event, rowIndex, "isHard")} />
              </td>
              <td>
              <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
              <button onClick={() => handleSaveRow(rowIndex)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    <button onClick={handleAddRow}>Add Row</button>
    <button onClick={handleSubmit}>Submit</button>
    </div>
    );
}

export default MerchTable;
