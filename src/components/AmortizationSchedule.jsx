import React from 'react';
import styled from 'styled-components';
import { exportToPDF, exportToCSV } from '../utils/export';
import AmortizationChart from './AmortizationChart';

const Summary = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  border: 1px solid #dee2e6;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #dee2e6;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

const ExportButton = styled.button`
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const AmortizationSchedule = ({ schedule }) => {
  const { monthlyPayment, totalInterest, payments } = schedule;

  return (
    <div>
      <Summary>
        <h3>Loan Summary</h3>
        <p>Monthly Payment: ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <p>Total Interest: ${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </Summary>

      <AmortizationChart payments={payments} />

      <ExportButtons>
        <ExportButton onClick={() => exportToPDF(schedule)}>
          Export to PDF
        </ExportButton>
        <ExportButton onClick={() => exportToCSV(schedule)}>
          Export to CSV
        </ExportButton>
      </ExportButtons>

      <Table>
        <thead>
          <tr>
            <Th>Payment #</Th>
            <Th>Payment</Th>
            <Th>Principal</Th>
            <Th>Interest</Th>
            <Th>Remaining Balance</Th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <Td>{payment.number}</Td>
              <Td>${payment.payment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Td>
              <Td>${payment.principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Td>
              <Td>${payment.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Td>
              <Td>${payment.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AmortizationSchedule;
