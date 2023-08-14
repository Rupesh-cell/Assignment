import React, { useState, useEffect } from "react";
import axios from "axios";
import "../scss/list.scss";
import {
  BarChart,
  ResponsiveContainer,
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
      let bpis = response.data.bpi;
      let filteredData = [];
      for (const x of Object.keys(bpis)) {
        filteredData.push({
          code: bpis[x]["code"],
          rate: parseFloat(bpis[x]["rate"].replace(",", "")),
          rate_float: parseFloat(bpis[x]["rate_float"]),
        });
      }
      setData(filteredData);
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
  }, []);

  return (
    <div className="barr">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} className="chaaart">
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="code" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rate" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
