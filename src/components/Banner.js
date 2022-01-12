import React from "react";
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
// import bg from "../assets/banner2.jpg";
import Carousel from "./Carousel";
const Banner = () => {
  return (
    <section className="banner-section" style={{ height: "400px" }}>
      <Container className="pt-4">
        <Row className="pt-4" style={{ height: "40%" }}>
          <Col xs={10} className="mx-auto pt-5">
            <h2 className="text-white text-center">crypto hunter</h2>
            <p className="text-muted text-center">
              get all info concerning your favourite crypto currency
            </p>
          </Col>
        </Row>

        <Row>
          <Col xs={10} className="mx-auto pt-2">
            <Carousel />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;
