const fetch = require('node-fetch');

const generateNumericId = () => {
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += Math.floor(Math.random() * 10000000000);
  }
  return id;
};

const createMerchandise = async (merchandise) => {
  const id = generateNumericId(); // generate a unique numeric id
  merchandise.id = id; // set the id property of the merchandise object to the generated id
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
  const response = await fetch('https://sheetdb.io/api/v1/nc7krlodazbab', {
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
  console.log('Updating merchandise with id:', id, 'and data:', merchandise)
  const response = await fetch(`https://sheetdb.io/api/v1/nc7krlodazbab/id/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"
    },
    body: JSON.stringify(merchandise)
  });
  const data = await response.json();
  if (!response.ok) {
    console.error(`Failed to update merchandise with id ${id}: ${data.message}`);
  }
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

  const getCcInfo = async () => {
    const response = await fetch('https://sheetdb.io/api/v1/nc7krlodazbab?sheet=CCSheet', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"
      }
    });
    const ccData = await response.json();
    return ccData;
  };

  const updateCcInfo = async (ccId, ccInfo) => {
    ccId = 1;
    console.log('Updating credit card info with id:', ccId, 'and data:', ccInfo)
    const response = await fetch(`https://sheetdb.io/api/v1/nc7krlodazbab/id/${ccId}?sheet=CCSheet`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"
      },
      body: JSON.stringify(ccInfo)
    });
    const ccData = await response.json();
    if (!response.ok) {
      console.error(`Failed to update credit card info with id ${ccId}: ${ccData.message}`);
    }
    return ccData;
  };
  
  
module.exports = {
    getAllMerchandise,
    createMerchandise,
    updateMerchandise,
    deleteMerchandise,
    deleteAllMerchandise,
    getCcInfo,
    updateCcInfo
}