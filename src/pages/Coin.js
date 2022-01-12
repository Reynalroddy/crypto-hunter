import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "../components/Chart";
const Coin = () => {
  const [coin, setCoin] = React.useState();
  const { id } = useParams();
  const { cur } = useSelector((state) => state.currency);
  const [isLoading, setIsLoading] = React.useState(false);
  const fetchCoin = async () => {
    setIsLoading(true);
    try {
      const coinn = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoin(coinn.data);
      setIsLoading(false);
      //   console.log(trends);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, [id, cur]);
  // console.log(coin);

  return (
    <section className="bg-dark">
      <Container>
        <Row>
          <Col xs={10} md={4} className=" mx-auto pt-5 f-col text-center">
            <img src={coin?.image.large} width="95" height="75" />
            <h2 className="text-white text-center">{coin?.name}</h2>
            <p className="text-muted text-center">
              {coin?.description.en.split(".")[0]}
            </p>
            <p className="text-white text-center">
              rank:{coin?.market_cap_rank}
            </p>

            <p className="text-white text-center">
              price: {`${cur}`}{" "}
              {coin?.market_data.current_price[`${cur.toLowerCase()}`]}
            </p>

            <p className="text-white text-center">
              market_cap:{coin?.market_data.market_cap[`${cur.toLowerCase()}`]}
            </p>
          </Col>

          <Col xs={10} md={8} className=" pt-5 text-white">
            <Chart id={id} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Coin;
