import React, { useState, useEffect } from 'react';
import { getAllMerchandise, createMerchandise, updateMerchandise, deleteMerchandise, deleteAllMerchandise } from './Database';
export const ccData = {
  sales: 100,
  percentage: 2.5,
  fee: 0.25
};

function MerchTable() {
  const [data, setData] = useState([{ id: null, item: '', size: '', price: 0, countIn: 0, countOut: 0, comps: 0, isHard: false }]);
  const [ccData, setCcData] = useState({ sales: 0, percentage: 0, fee: 0 });

  useEffect(() => {
    getAllMerchandise()
      .then(rows => {
        setData(rows);
      })
      .catch(err => {
        console.error(err);
      });

    const savedCcData = localStorage.getItem('ccData');
    if (savedCcData) {
      setCcData(JSON.parse(savedCcData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ccData', JSON.stringify(ccData));
  }, [ccData]);

  const handleInputChange = (event, rowIndex, field) => {
    const { value, type, checked } = event.target;
    const newData = [...data];
    const row = newData[rowIndex];
    row[field] = type === 'checkbox' ? checked : value;
    if (type === 'checkbox') {
      row[field] = checked; // convert to boolean
    } else {
      row[field] = value;
    }
    setData(newData);
  };

  
  const handleDeleteRow = (rowIndex) => {
    const row = data[rowIndex];
    if (row.id) {
      deleteMerchandise(row.id)
        .then(() => {
          const newData = [...data];
          newData.splice(rowIndex, 1);
          setData(newData);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      const newData = [...data];
      newData.splice(rowIndex, 1);
      setData(newData);
    }
  };

  const handleSaveRow = (rowIndex) => {
    const row = data[rowIndex];
    if (row.id) {
      updateMerchandise(row.id, row)
        .then(() => {
          console.log(`Row with id ${row.id} updated`);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      createMerchandise(row)
        .then((newRow) => {
          const newData = [...data];
          newData[rowIndex] = { ...row, id: newRow.id }; // Update the id property
          setData(newData);
          console.log(`A row has been inserted with rowid ${row.id}`);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleAddRow = () => {  
    const newData = [...data];
    const newRow = { id: null, item: '', size: '', price: 0, countIn: 0, countOut: 0, comps: 0, isHard: false };
    newData.push(newRow);
    setData(newData);
  };
  

  const handleSaveTable = () => {
    data.forEach((row, index) => {
      if (row.id) {
        updateMerchandise(row.id, row)
          .then(() => {
            console.log(`Row with id ${row.id} updated`);
          })
          .catch(err => {
            console.error(err);
            const newData = [...data];
            newData[index] = { ...row }; // Revert the changes made to the row
            setData(newData);
          });
      } else {
        createMerchandise(row)
          .then((id) => {
            id = row.id;
            const newData = [...data];
            newData[index] = { ...row }; // Update the row with the new id
            console.log(`Row with id ${id} has been saved`);
            setData(newData);
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  };
  
  
    

  const handleExportData = () => {
    //export data to a CSV File
  };

  const handleDeleteAll = async () => {
    try {
      const response = await deleteAllMerchandise();
      console.log(response.message);
      setData([]);
    } catch (error) {
      console.error('Error deleting merchandise table', error);
    }
  };
  

  const handleCcInputChange = (event, field) => {
    const { value } = event.target;
    setCcData({ ...ccData, [field]: value });
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
                <input type="number" value={row.countIn} onChange={(event) => handleInputChange(event, rowIndex, "countIn")} />
              </td>
              <td>
                <input type="number" value={row.countOut} onChange={(event) => handleInputChange(event, rowIndex, "countOut")} />
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
            <tr>
              <td>Credit Card Sales:</td>
              <td><input type="number" value={ccData.sales} onChange={(event) => handleCcInputChange(event, "sales")} /></td>
              <td>Credit Card Percentage:</td>
              <td><input type="number" value={ccData.percentage} onChange={(event) => handleCcInputChange(event, "percentage")} /></td>
              <td>Credit Card Fee:</td>
              <td><input type="number" value={ccData.fee} onChange={(event) => handleCcInputChange(event, "fee")} /></td>
            </tr>
        </tbody>
    </table>
    <button onClick={handleAddRow}>Add Row</button>
    <button onClick={handleSaveTable}>Save All</button>
    <button onClick={handleExportData}>Export</button>
    <button onClick={handleDeleteAll}>Delete All</button>
    </div>
    );
}

export default MerchTable;