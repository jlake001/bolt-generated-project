import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
`;

const SliderContainer = styled.div`
  margin: 1.5rem 0;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  color: #555;
  font-weight: 500;
`;

const Value = styled.span`
  background: #f0f4f8;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: #2563eb;
`;

const Slider = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: #e2e8f0;
  border-radius: 3px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #2563eb;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
`;

const Option = styled.button`
  padding: 0.75rem;
  border: 2px solid ${props => props.selected ? '#2563eb' : '#e2e8f0'};
  border-radius: 8px;
  background: ${props => props.selected ? '#eef2ff' : 'white'};
  color: ${props => props.selected ? '#2563eb' : '#64748b'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #2563eb;
  }
`;

const CalculateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;

  &:hover {
    background: #1d4ed8;
  }
`;

const Calculator = ({ onCalculate }) => {
  const [amount, setAmount] = useState(250000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(30);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [loanType, setLoanType] = useState('fixed');

  const handleCalculate = () => {
    onCalculate(amount, rate, years, paymentFrequency, loanType);
  };

  return (
    <CalculatorContainer>
      <SliderContainer>
        <SliderHeader>
          <Label>Loan Amount</Label>
          <Value>${amount.toLocaleString()}</Value>
        </SliderHeader>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0'
          }}
        />
      </SliderContainer>

      <SliderContainer>
        <SliderHeader>
          <Label>Interest Rate (%)</Label>
          <Value>{rate}%</Value>
        </SliderHeader>
        <Slider
          type="range"
          min="0.1"
          max="15"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </SliderContainer>

      <SliderContainer>
        <SliderHeader>
          <Label>Loan Term (Years)</Label>
          <Value>{years} years</Value>
        </SliderHeader>
        <Slider
          type="range"
          min="1"
          max="30"
          step="1"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        />
      </SliderContainer>

      <Label>Payment Frequency</Label>
      <OptionsGrid>
        <Option
          selected={paymentFrequency === 'monthly'}
          onClick={() => setPaymentFrequency('monthly')}
        >
          Monthly
        </Option>
        <Option
          selected={paymentFrequency === 'biweekly'}
          onClick={() => setPaymentFrequency('biweekly')}
        >
          Bi-Weekly
        </Option>
      </OptionsGrid>

      <Label>Loan Type</Label>
      <OptionsGrid>
        <Option
          selected={loanType === 'fixed'}
          onClick={() => setLoanType('fixed')}
        >
          Fixed Rate
        </Option>
        <Option
          selected={loanType === 'variable'}
          onClick={() => setLoanType('variable')}
        >
          Variable Rate
        </Option>
      </OptionsGrid>

      <CalculateButton onClick={handleCalculate}>
        Generate Amortization Schedule
      </CalculateButton>
    </CalculatorContainer>
  );
};

export default Calculator;
