import axios from "axios";

const fetchPrice = async () => {
  const options = {
    method: "GET",
    url: "https://api.coindesk.com/v1/bpi/currentprice.json",
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
  }
 
};
export default fetchPrice;
