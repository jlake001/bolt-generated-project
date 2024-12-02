export const calculateLoanDetails = (amount, annualRate, years, frequency = 'monthly', type = 'fixed') => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * (frequency === 'monthly' ? 12 : 26);
  const paymentFactor = frequency === 'monthly' ? 1 : 26/12;
  
  const periodicPayment = amount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / 
    paymentFactor;

  let balance = amount;
  let totalInterest = 0;
  const payments = [];

  for (let i = 1; i <= numberOfPayments; i++) {
    let currentRate = monthlyRate;
    if (type === 'variable') {
      currentRate = monthlyRate * (1 + (Math.random() * 0.1 - 0.05));
    }

    const interest = balance * currentRate;
    const principal = periodicPayment - interest;
    balance = Math.max(0, balance - principal);
    totalInterest += interest;

    payments.push({
      number: i,
      payment: periodicPayment,
      principal: principal,
      interest: interest,
      balance: balance,
      rate: currentRate * 12 * 100
    });
  }

  return {
    monthlyPayment: periodicPayment,
    totalInterest,
    payments,
    frequency,
    type
  };
};
