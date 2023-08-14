import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const BarCharts = () => {
  const [data, setData] = useState([]);

  const fetchPrice = async () => {
    const options = {
      method: "GET",
      url: "https://api.coindesk.com/v1/bpi/currentprice.json",
    };

    try {
      const response = await axios.request(options);
      let bpis =response.data.bpi;
      let filteredData = [];
      for (const x of Object.keys(bpis)) {
        filteredData.push({
          code: bpis[x]["code"],
          rate: parseFloat(bpis[x]["rate"].replace(",", "")),
		  
          rate_float: parseFloat(bpis[x]["rate_float"]),
        });
      }
      setData(filteredData);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPrice();

    const interval = setInterval(fetchPrice, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <>
      <BarChart width={1000} height={600} data={data}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="code" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rate" fill="#8884d8" />
        <Bar dataKey="rate_float" fill="#32a852" />

      </BarChart>
    </>
  );
};

export default BarCharts;
