import * as XLSX from 'xlsx';
import React, { useState, useEffect } from 'react';
import { getAllMerchandise, createMerchandise, updateMerchandise, deleteMerchandise, deleteAllMerchandise, getCcInfo, updateCcInfo } from './Database';

function MerchTable(props) {
  const [data, setData] = useState([{ id: null, item: '', size: '', price: 0, countIn: 0, countOut: 0, comps: 0, isHard: false }]);
  const [ccData, setCcData] = useState({ ccId: 1, ccSales: 0, ccPercentage: 0, ccFee: 0 });

  useEffect(() => {
    getAllMerchandise()
      .then(rows => {
        setData(rows);
      })
      .catch(err => {
        console.error(err);
      });

    getCcInfo()
      .then(rows => {
        setCcData(rows[0]);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const ccFee = ccData.ccSales * ccData.ccPercentage / 100;
    setCcData(prevCcData => ({ ...prevCcData, ccFee })); // use a functional update
  }, [ccData.ccSales, ccData.ccPercentage]);

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
  
    if (ccData && (field === 'ccSales' || field === 'ccPercentage')) {
      setCcData(prevCcData => ({
        ...prevCcData,
        [field]: value,
        ccFee: (value / 100) * (prevCcData.ccSales || 0)
      }));
    }
  };
  

  const handleDeleteRow = (rowIndex) => {
    const row = data[rowIndex];
    if (row.id) {
      deleteMerchandise(row.id)
        .then(() => {
          const newData = [...data];
          newData.splice(rowIndex, 1);
          setData(newData);
          props.onDataUpdated();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      const newData = [...data];
      newData.splice(rowIndex, 1);
      setData(newData);
      props.onDataUpdated();
    }
  };

  const handleSaveRow = (rowIndex) => {
    const row = data[rowIndex];
    if (row.id) {
      updateMerchandise(row.id, row)
        .then(() => {
          console.log(`Row with id ${row.id} updated`);
          props.onDataUpdated();          
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
          props.onDataUpdated();          
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
            props.onDataUpdated();            
          })
          .catch(err => {
            console.error(err);
            const newData = [...data];
            newData[index] = { ...row }; // Revert the changes made to the row
            setData(newData);
            props.onDataUpdated();
          });
      } else {
        createMerchandise(row)
          .then((id) => {
            id = row.id;
            const newData = [...data];
            newData[index] = { ...row }; // Update the row with the new id
            console.log(`Row with id ${id} has been saved`);
            setData(newData);
            props.onDataUpdated();            
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
    handleCcInfoSave();
  };
  
  const handleExportData = () => {
    // Only include columns needed for export
    const exportData = data.map(({ item, size, price, countIn, countOut }) => ({ item, size, price, countIn, countOut }));
  
    // Convert data to worksheet format
    const worksheet = XLSX.utils.json_to_sheet(exportData);
  
    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Merchandise Data');
  
    // Save file to local machine
    const filename = 'merchandise-data.xlsx';
    XLSX.writeFile(workbook, filename);
  };
  
  const handleCcInfoSave = () => {
    if (ccData.ccFee) {
      // If ccFee is already present, update ccData state with it
      updateCcInfo(ccData.ccId, ccData)
        .then(() => {
          console.log('Credit card info updated successfully');
          props.onDataUpdated();          
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      // Calculate ccFee and then update ccData state
      setCcData(prevCcData => ({
        ...prevCcData,
        ccFee: (prevCcData.ccSales / 100) * prevCcData.ccPercentage
      }));
      updateCcInfo(ccData.ccId, ccData)
        .then(() => {
          console.log('Credit card info updated successfully');
          props.onDataUpdated();
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleClearCcInfo = () => {
    setCcData({ ccId: 1, ccSales: 0, ccPercentage: 0, ccFee: 0 });
    try {
      const updatedCcInfo = { ...ccData[0], ccSales: 0, ccPercentage: 0, ccFee: 0 };
      updateCcInfo(updatedCcInfo.ccId, updatedCcInfo);  
      console.log('Credit card info cleared successfully');
      props.onDataUpdated();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await deleteAllMerchandise();
      console.log(response.message);
      setData([]);
      setCcData({ ccId: 1, ccSales: 0, ccPercentage: 0, ccFee: 0 });
      handleCcInfoSave();
      props.onDataUpdated();
    } catch (error) {
      console.error('Error deleting merchandise table', error);
    }
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
                <input type="checkbox" checked={row.isHard} onChange={(event) => handleInputChange(event, rowIndex, "isHard")} />
              </td>
              <td>
              <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
              <button onClick={() => handleSaveRow(rowIndex)}>Save</button>
              </td>
            </tr>
          ))}
            <tr>
  <td>Credit Card Sales:</td>
  <td><input type="number" value={ccData.ccSales} onChange={(event) => setCcData({ ...ccData, ccSales: event.target.value })} /></td>
  <td>Credit Card Percentage:</td>
  <td><input type="number" value={ccData.ccPercentage} onChange={(event) => setCcData({ ...ccData, ccPercentage: event.target.value })} /></td>
  <td>Credit Card Fee:</td>
  <td><input type="number" value={ccData.ccFee} onChange={(event) => setCcData({ ...ccData, ccFee: event.target.value })} /></td>
  <td></td>
  <td>
    <button onClick={handleCcInfoSave}>Save CCFee Info</button>
    <button onClick={handleClearCcInfo}>Clear Credit Card Info</button>
  </td>
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