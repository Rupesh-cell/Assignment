import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BarCharts from "../components/BarChart";
import CoinList from "../components/CoinList";
import '../scss/bar.scss';


const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Container>
          <h1>Crypto Dashboard</h1>
         
            <BarCharts />
            
            
            <CoinList/>
            
          

        </Container>
      </div>
    </>
  );
};

export default Dashboard;
