// Format as MMK currency using toLocaleString
const formatMMK = amount =>
  amount?.toLocaleString('en-MM', {
    style: 'currency',
    currency: 'MMK',
    minimumFractionDigits: 0
  }) || '0 MMK';

// Validate loan amount
const validateLoanAmount = () => {
  const loanAmountInput = document.getElementById("LoanAmount");
  const loanAmount = parseFloat(loanAmountInput.value);
  const message = document.getElementById("loanMessage");
  const loanAmountDisplay = document.getElementById("LoanAmountDisplay");

  // Format and display
  loanAmountDisplay.textContent = formatMMK(loanAmount);

  if (isNaN(loanAmount) || loanAmount < 50000) {
    message.textContent = "Minimum loan amount is 50,000 MMK!";
    message.classList.add("error");
    message.classList.remove("success");
    return false;
  }

  if (loanAmount > 10000000) {
    message.textContent = "Maximum loan amount is 10,000,000 MMK!";
    message.classList.add("error");
    message.classList.remove("success");
    return false;
  }

  message.textContent = "Loan amount is valid!";
  message.classList.remove("error");
  message.classList.add("success");
  return true;
};

// Update months display
const updateYearsDisplay = value => {
  document.getElementById('yearsDisplay').textContent = `${value} Months`;
};

// EMI Calculation
const calculateTotal = () => {
  const loanAmount = parseFloat(document.getElementById('LoanAmount').value) || 0;
  const months = parseInt(document.getElementById('loanYears').value) || 0;
  const monthlyInterestRate = 0.023; // 2.3% monthly (28% annual)

  if (!validateLoanAmount() || months <= 0) {
    alert("Please enter a valid loan amount and loan term.");
    return;
  }

  const EMI =
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);

  const totalPayment = EMI * months;
  const totalInterest = totalPayment - loanAmount;

  document.getElementById('monthlyPayment').textContent = formatMMK(EMI);
  document.getElementById('result').textContent = formatMMK(totalPayment);
  document.getElementById('totalInterest').textContent = formatMMK(totalInterest);
};

// Reset form and display
const clearForm = () => {
  const defaultLoan = 50000;
  const defaultMonths = 3;

  document.getElementById('LoanAmount').value = '';
  document.getElementById('loanYears').value = defaultMonths;

  document.getElementById("LoanAmountDisplay").textContent = formatMMK(defaultLoan);
  updateYearsDisplay(defaultMonths);

  document.getElementById('monthlyPayment').textContent = '0.00 MMK';
  document.getElementById('result').textContent = '0.00 MMK';
  document.getElementById('totalInterest').textContent = '0.00 MMK';
};
