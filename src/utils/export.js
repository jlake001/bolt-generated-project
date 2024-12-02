import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (schedule) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Loan Amortization Schedule', 14, 15);
  
  doc.setFontSize(12);
  doc.text(`Monthly Payment: $${schedule.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 14, 25);
  doc.text(`Total Interest: $${schedule.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 14, 32);
  
  const tableData = schedule.payments.map(payment => [
    payment.number,
    `$${payment.payment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `$${payment.principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `$${payment.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `$${payment.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  ]);

  doc.autoTable({
    startY: 40,
    head: [['#', 'Payment', 'Principal', 'Interest', 'Balance']],
    body: tableData,
  });

  doc.save('amortization-schedule.pdf');
};

export const exportToCSV = (schedule) => {
  const headers = ['Payment #,Payment,Principal,Interest,Balance\n'];
  
  const rows = schedule.payments.map(payment => 
    `${payment.number},${payment.payment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })},${payment.principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })},${payment.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })},${payment.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`
  );

  const csvContent = headers.concat(rows).join('');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'amortization-schedule.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
