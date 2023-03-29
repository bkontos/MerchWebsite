const fetch = require('node-fetch');

const createMerchandise = async (merchandise) => {
    const response = await fetch('https://sheetdb.io/api/v1/nc7krlodazbab', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"
      },
      body: JSON.stringify(merchandise)
    });
    const data = await response.json();
    return data;
  };

const getAllMerchandise = async () => {
  const response = await fetch('"https://sheetdb.io/api/v1/nc7krlodazbab', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"
    }
  });
  const data = await response.json();
  return data;
};
  
const updateMerchandise = async (id, merchandise) => {
    const response = await fetch(`https://sheetdb.io/api/v1/nc7krlodazbab/id/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"
      },
      body: JSON.stringify(merchandise)
    });
    const data = await response.json();
    return data;
  };
  
const deleteMerchandise = async (id) => {
    console.log(`Deleting merchandise with id ${id}`);
    const response = await fetch(`https://sheetdb.io/api/v1/nc7krlodazbab/id/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"
      }
    });
    const data = await response.json();
    console.log(`Response from deleteMerchandise: ${JSON.stringify(data)}`);
    return data;
  };

  const deleteAllMerchandise = async () => {
    const response = await fetch('https://sheetdb.io/api/v1/nc7krlodazbab/all', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2'
      }
    });
    const data = await response.json();
    return data;
  };
  
  
  
module.exports = {
    getAllMerchandise,
    createMerchandise,
    updateMerchandise,
    deleteMerchandise,
    deleteAllMerchandise
}