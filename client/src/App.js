import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Electionabi from "./contracts/Election.json";
import Web3 from "web3";
import Navbar from "./Navbar";
import CandidateTable from "./CandidateTable";

function App() {
  useEffect(() => {
    loadWeb3();
    LoadBlockchaindata();
  }, []);

  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setloading] = useState(true);
  const [ElectionSM, SetElectionSM] = useState();
  const [data, setData] = useState();

  const loadWeb3 = async () => {
    if (window.etherum) {
      window.web3 = new Web3(window.etherum);
      await window.etherum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non etherum browser detect");
    }
  };

  const LoadBlockchaindata = async () => {
    setloading(true);
    const web3 = window.web3;
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setCurrentAccount(accounts);
    console.log(currentAccount);
    const networkId = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );

      SetElectionSM(election);
      await updateCandidates(election);
      setloading(false);
    } else {
      window.alert("the smartcontract is not deployed current network");
    }
  };

  async function updateCandidates(electionContract) {
    const candidate1 = await electionContract.methods.candidates(1).call();
    const candidate2 = await electionContract.methods.candidates(2).call();
    let tempData = {
      candidates: [candidate1, candidate2],
      contract: electionContract,
    };
    setData(tempData);
  }

  async function voteCandidate(candidateId) {
    try {
      setloading(true);
      await ElectionSM.methods
        .vote(candidateId)
        .send({ from: String(currentAccount) })
        .on("transactionhash", () => {
          alert("Vote success");
        });
      await updateCandidates(ElectionSM);
      setloading(false);
    } catch (err) {
      console.log(err);
      alert("error");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  } else {
    console.log("render");
    return (
      <div className="App">
        <Navbar account={currentAccount}></Navbar>
        <CandidateTable data={data} callback={voteCandidate}></CandidateTable>
      </div>
    );
  }
}

export default App;
