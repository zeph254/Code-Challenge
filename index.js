const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculatePAYE(basicSalary) {
  if (basicSalary <= 24000) {
    return 0.0;
  } else if (basicSalary <= 32333) {
    return (basicSalary - 24000) * 0.1;
  } else if (basicSalary <= 40000) {
    return (basicSalary - 32333) * 0.25 + 833.3; 
  } else {
    return (basicSalary - 40000) * 0.3 + 2083.3;
  }
}

function calculateNHIF(basicSalary) {
  if (basicSalary <= 5999) {
    return 150;
  } else if (basicSalary <= 7999) {
    return 300;
  } else if (basicSalary <= 11999) {
    return 400;
  } else if (basicSalary <= 14999) {
    return 500;
  } else if (basicSalary <= 19999) {
    return 600;
  } else if (basicSalary <= 24999) {
    return 750;
  } else if (basicSalary <= 29999) {
    return 800;
  } else if (basicSalary <= 34999) {
    return 900;
  } else if (basicSalary <= 39999) {
    return 950;
  } else if (basicSalary <= 44999) {
    return 1000;
  } else if (basicSalary <= 49999) {
    return 1100;
  } else if (basicSalary <= 59999) {
    return 1200;
  } else if (basicSalary <= 69999) {
    return 1300;
  } else if (basicSalary <= 79999) {
    return 1400;
  } else {
    return 1500; // For 80,000 and above
  }
}

function calculateNSSF(basicSalary) {
  return Math.min(basicSalary * 0.06, 180); // I assumed the cap for NSSF deduction is 180
}

function calculateNetSalary(basicSalary, benefits) {
  const grossSalary = basicSalary + benefits;
  const payee = calculatePAYE(basicSalary);
  const nhif = calculateNHIF(basicSalary);
  const nssf = calculateNSSF(basicSalary);

  const totalDeductions = payee + nhif + nssf;
  const netSalary = grossSalary - totalDeductions;

  return {
    grossSalary: grossSalary,
    payee: payee,
    nhif: nhif,
    nssf: nssf,
    netSalary: netSalary,
  };
}

// Get user input
rl.question("Enter the basic salary: ", (basicSalaryInput) => {
  rl.question("Enter the benefits: ", (benefitsInput) => {
    const basicSalary = parseFloat(basicSalaryInput);
    const benefits = parseFloat(benefitsInput);

    if (!isNaN(basicSalary) && !isNaN(benefits)) {
      const salaryInfo = calculateNetSalary(basicSalary, benefits);

      console.log("\nSalary Breakdown:");
      console.log(`Gross Salary: KSh ${salaryInfo.grossSalary.toFixed(2)}`);
      console.log(`PAYE: KSh ${salaryInfo.payee.toFixed(2)}`);
      console.log(`NHIF: KSh ${salaryInfo.nhif.toFixed(2)}`);
      console.log(`NSSF: KSh ${salaryInfo.nssf.toFixed(2)}`);
      console.log(`Net Salary: KSh ${salaryInfo.netSalary.toFixed(2)}`);
    } else {
      console.log(
        "Please enter valid numerical values for salary and benefits."
      );
    }
    rl.close(); // Close the readline interface
  });
});
 