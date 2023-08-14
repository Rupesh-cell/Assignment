import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BarCharts from "./BarChart";
import CoinList from "./CoinList";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Container>
          <Row>
            
            <Col>
            <BarCharts />
            </Col>
            <Col>
            <CoinList/>
            </Col>
          </Row>

        </Container>
      </div>
    </>
  );
};

export default Dashboard;
