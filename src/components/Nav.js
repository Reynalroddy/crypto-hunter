import React from "react";
import { Container, Form, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/currencySlice";

const Navs = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const curType = useSelector((state) => state.currency);
  const handleChange = (e) => {
    dispatch(update(e.target.value));
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          className="logos"
          onClick={() => nav("/", { replace: true })}
        >
          Crypto Hunter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Form.Select
              aria-label="Default select example"
              style={{ width: "90px" }}
              onChange={handleChange}
            >
              <option value="usd">USD</option>
              <option value="ngn">NGN</option>
            </Form.Select>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navs;
