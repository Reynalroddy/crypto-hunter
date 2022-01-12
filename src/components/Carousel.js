import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
const Carousel = () => {
  const curType = useSelector((state) => state.currency);
  const [trendCoin, setTrendCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const trends = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curType.cur}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      setTrendCoin(trends.data);
      setLoading(false);
      //   console.log(trends);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [curType]);
  //   console.log(trendCoin);

  const coinz = trendCoin.map((coin, i) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coin/${coin?.id}`} key={i}>
        <div className="itemz" style={{ color: "white" }}>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span style={{ display: "block" }}>
            {coin?.symbol}
            &nbsp; &nbsp; &nbsp;
            <span
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        autoPlayInterval={1000}
        infinite
        animationDuration={1500}
        responsive={responsive}
        autoPlay
        disableButtonsControls
        disableDotsControls
        items={coinz}
      />
    </div>
  );
};

export default Carousel;
