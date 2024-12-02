import React, { useState } from 'react';
import styled from 'styled-components';
import Calculator from './components/Calculator';
import AmortizationSchedule from './components/AmortizationSchedule';
import { calculateLoanDetails } from './utils/calculations';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.h1`
  text-align: center;
  color: #1e293b;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const App = () => {
  const [schedule, setSchedule] = useState(null);

  const handleCalculate = (amount, rate, years, frequency, type) => {
    const details = calculateLoanDetails(amount, rate, years, frequency, type);
    setSchedule(details);
  };

  return (
    <AppContainer>
      <Header>Loan Calculator</Header>
      <Calculator onCalculate={handleCalculate} />
      {schedule && <AmortizationSchedule schedule={schedule} />}
    </AppContainer>
  );
};

export default App;
