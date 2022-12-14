const URL = 'http://localhost:3001/sales';

const requestCreateSales = async (sales, token) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(sales),
    });

    const result = await response.json();

    return result;
  } catch (err) {
    return false;
  }
};

export default requestCreateSales;
