import React, { useEffect, useState } from 'react';
import { Button, Navbar, Container } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Electionabi from './contracts/Election.json';
import Web3 from "web3";

function App() {

  useEffect(() => {
      loadWeb3();
      LoadBlockchaindata();
  });

  const loadWeb3 = async () => {
    if (window.etherum) {
      window.web3 = new Web3(window.etherum);
      await window.etherum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non etherum browser detect");
    }
  }

  const LoadBlockchaindata = async () => {
    const web3 = window.web3;

    const accounts = web3.eth.getAccounts();
    const account = accounts[0];

    const networkId = await web3.eth.net.getId();

    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(Electionabi.abi, networkData.address);
      console.log(election);
    } else {
      window.alert("the smartcontract is not deployed current network");
    }
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Election Dapp
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
