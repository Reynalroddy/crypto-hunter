import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Offcanvas,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Line } from "react-chartjs-2";
const Chart = ({ id }) => {
  const { cur } = useSelector((state) => state.currency);
  const [chartdata, setChartData] = useState();
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  //   const { id } = useParams();
  const fetchHistoricData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${cur}&days=${days}`
      );
      setChartData(data.prices);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const chartData =
    chartdata &&
    chartdata.map((it) => {
      const day = new Date(it[0]).toLocaleDateString();
      const price = it[1];

      return { day, price };
    });

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur, days]);
  console.log(chartData);

  // console.log(chartdata);
  return (
    <>
      <ResponsiveContainer width={400} height="80%">
        <LineChart
          data={chartData}
          margin={{
            right: 30,
            left: 20,
          }}
        >
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#d6ad3e" />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
