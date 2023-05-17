import axios from 'axios';

export const createMerchandise = async (merchandise) => {
  const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/createMerchandise`, merchandise, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

export const getAllMerchandise = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getAllMerchandise`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

export const updateMerchandise = async (id, merchandise) => {
  console.log('Updating merchandise with id:', id, 'and data:', merchandise)
  const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/updateMerchandise/${id}`, merchandise, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.status !== 200) {
    console.error(`Failed to update merchandise with id ${id}: ${response.data.message}`);
  }
  return response.data;
};

export const deleteMerchandise = async (id) => {
  console.log(`Deleting merchandise with id ${id}`);
  const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/deleteMerchandise/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  console.log(`Response from deleteMerchandise: ${JSON.stringify(response.data)}`);
  return response.data;
};

export const deleteAllMerchandise = async () => {
  const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/deleteAllMerchandise`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

export const getCcInfo = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getCcInfo`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

export const updateCcInfo = async (ccId, ccInfo) => {
  console.log('Updating credit card info with id:', ccId, 'and data:', ccInfo)
  const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/updateCcInfo/${ccId}`, ccInfo, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (response.status !== 200) {
    console.error(`Failed to update credit card info with id ${ccId}: ${response.data.message}`);
  }
  return response.data;
};