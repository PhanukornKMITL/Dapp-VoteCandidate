import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const CandidateTable = ({ data, callback}) => {
  console.log('init candidate')
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Candidate ID</TableCell>
            <TableCell align="right">Candidate Name</TableCell>
            <TableCell align="right">Vote Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.candidates.map((candidate, index) => (
            <TableRow
              key={candidate.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {candidate.id}
              </TableCell>
              <TableCell align="right">{candidate.name}</TableCell>
              <TableCell align="right">{candidate.voteCount}</TableCell>
              <TableCell align="left" style={{border: 'none'}}>
                <Button
                  variant="contained"
                  onClick={() => callback(candidate.id)}
                >
                  Vote
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



export default CandidateTable;
