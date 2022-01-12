import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const Table = () => {
  const { cur } = useSelector((state) => state.currency);
  const [coins, setCoins] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [filt, setFilt] = React.useState([]);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const columns = [
    {
      name: "Coin",

      cell: (row) => (
        <div>
          <img height="35px" width="30px" alt={row.name} src={row.image} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="text-uppercase font-weight-bold">
              {row.symbol}
            </span>
            <span>{row.name}</span>
          </div>
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.current_price,
      sortable: true,
      cell: (row) => (
        <span>
          {`${cur} `}
          {numberWithCommas(row.current_price.toFixed(2))}
        </span>
      ),
    },
    {
      name: "24h Change",
      selector: (row) => row.price_change_percentage_24h,
      sortable: true,
    },
    {
      name: "Market Cap",
      selector: (row) => row.market_cap,
      sortable: true,
      cell: (row) => (
        <span>
          {`${cur} `}
          {numberWithCommas(row.market_cap).toString().slice(0, -6)}M
        </span>
      ),
    },

    {
      name: "Action",
      cell: (row) => (
        <Link to={`/coin/${row.id}`}>
          <Button variant="success" size="sm">
            VIEW
          </Button>
        </Link>
      ),
    },
  ];
  const getCoins = async () => {
    try {
      const coinz = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      setCoins(coinz.data);

      //   console.log(trends);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const newCoins = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
    setFilt(newCoins);
    // return newCoins;
    // console.log(newCoins);
  };

  createTheme(
    "solarized",
    {
      text: {
        primary: "#fff",
        secondary: "#2aa198",
      },
      background: {
        default: "#000000",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "grey",
      },
    },
    "dark"
  );
  useEffect(() => {
    getCoins();
  }, [cur]);
  console.log(coins, search);
  return (
    <section className="tbl-section">
      <Container>
        <Row>
          <Col xs={5} className="mx-auto pt-5 text-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="search coin"
                onChange={handleChange}
              />
              <Button
                className="my-2"
                variant="primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={10} className="mx-auto pt-5">
            <DataTable
              columns={columns}
              data={filt.length > 0 ? filt : coins}
              pagination
              theme="solarized"
              selectableRows
            />
            ;
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Table;
