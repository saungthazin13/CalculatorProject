
function formatMMK(amount) {
    return `${Math.round(Number(amount)).toLocaleString('en-US')} MMK`;
}
	
	

// Function to validate loan amount input
        function validateLoanAmount() {
            const loanAmountInput = document.getElementById("LoanAmount");
            const loanAmount = parseFloat(loanAmountInput.value);
            const message = document.getElementById("loanMessage");
			const loanAmountDisplay = document.getElementById("LoanAmountDisplay"); 
            // Format the loan amount and display it
          loanAmountDisplay.textContent = formatMMK(loanAmount); // Update the span       with formatted amount
            if (isNaN(loanAmount) || loanAmount < 50000) {
                message.textContent = "Minimum loan amount is 50,000 MMK!"
                message.classList.add("error");
                message.classList.remove("success");
                return false;
            } else if (loanAmount > 10000000) {
                message.textContent = "Maximum loan amount is 10,000,000 MMK!";
                message.classList.add("error");
                message.classList.remove("success");
                return false;
            } else {
                message.textContent = "Loan amount is valid!";
                message.classList.remove("error");
                message.classList.add("success");
                return true;
            }
        }

function updateYearsDisplay(value) {
    document.getElementById('yearsDisplay').textContent = `${value} Months`;
}

// Main calculation logic for EMI, total payment, and interest
function calculateTotal() {
    const loanAmount = parseFloat(document.getElementById('LoanAmount').value) || 0;
    const months = parseInt(document.getElementById('loanYears').value) || 0;
    const monthlyInterestRate = 0.023; // Approximate monthly interest rate (28% annual)
 
	// Check if loan amount is valid
            if (!validateLoanAmount() || months <= 0) {
                alert("Please enter a valid loan amount and loan term.");
                return;
            }

  
  // EMI calculation formula
    const EMI = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) / 
                (Math.pow(1 + monthlyInterestRate, months) - 1);

    const totalPayment = EMI * months;
    const totalInterest = totalPayment - loanAmount;

    // Update result display
    document.getElementById('monthlyPayment').textContent = formatMMK(EMI);
    document.getElementById('result').textContent = formatMMK(totalPayment);
    document.getElementById('totalInterest').textContent = formatMMK(totalInterest);

   
}


function clearForm() {
    document.getElementById('LoanAmount').value = ''; // Clear loan amount
    document.getElementById('loanYears').value = 3; // Reset loan term to default (3)
    
    // Assuming you want to reset the loan amount display:
    // Update the amount display to the minimum value
    document.getElementById("LoanAmountDisplay").textContent = formatMMK(50000);
    updateYearsDisplay(3); // Reset months display
    
    // Reset result text
    document.getElementById('monthlyPayment').textContent = '0.00 MMK';
    document.getElementById('result').textContent = '0.00 MMK';
    document.getElementById('totalInterest').textContent = '0.00 MMK';

     
    
}


