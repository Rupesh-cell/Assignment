import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, FormControl, Form, Row, Col } from "react-bootstrap";
import CoinDetailModal from "./CoinDetailModal";
import "../scss/list.scss";

const CoinList = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coins, setCoins] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      setCoins(response.data.bpi);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPrice();

    // Refresh data every 10 seconds
    const interval = setInterval(() => {
      fetchPrice();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleCoinClick = (currency) => {
    setSelectedCoin(coins[currency]);
    setModalShow(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    const sortedKeys = Object.keys(coins).sort((a, b) => {
      const aRate = parseFloat(coins[a].rate);
      const bRate = parseFloat(coins[b].rate);
      return sortOrder === "asc" ? aRate - bRate : bRate - aRate;
    });

    const sortedCoins = {};
    sortedKeys.forEach((key) => {
      sortedCoins[key] = coins[key];
    });

    setCoins(sortedCoins);
  };

  const filteredCoins = Object.keys(coins).filter((currency) =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="neeu">
        <div className="card p-4 shadow">
          <h2 className="text-center mb-4">Coin Rates</h2>
          <Form>
            <Row className="idk">
              <Col>
                <FormControl
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Col>
              <Col>
                <Form.Select value={sortOrder} onChange={handleSortChange}>
                  <option value="asc">Sort Ascending</option>
                  <option value="desc">Sort Descending</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((currency) => (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{coins[currency].rate}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleCoinClick(currency)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <CoinDetailModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coinData={selectedCoin}
      />
    </>
  );
};

export default CoinList;
