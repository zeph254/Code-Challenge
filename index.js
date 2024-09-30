
    // tax collection
    // CALCULATE PAYEE TAX based on taxable income and tax brckets
    
        function calculatePAYE(taxableIncome) {
            // PAYE rates in effect from 1 July 2023:
            const taxRates = [
              { lowerLimit: 0, upperLimit: 24000, rate: 10.0 },          // 10% for income up to 24,000
              { lowerLimit: 24001, upperLimit: 32333, rate: 25.0 },      // 25% for income between 24,001 and 32,333
              { lowerLimit: 32334, upperLimit: 500000, rate: 30.0 },     // 30% for income between 32,334 and 500,000
              { lowerLimit: 500001, upperLimit: 800000, rate: 32.5 },    // 32.5% for income between 500,001 and 800,000
              { lowerLimit: 800001, upperLimit: Infinity, rate: 35.0 }   // 35% for income above 800,000
            ];
            //PAYE (Tax) = Calculated using PAYE tax brackets
              let tax = 0; // Initialize the tax variable to 0
              for (const cell of taxRates) {
                // Check if the taxable income falls within the current bracket
                if (taxableIncome <= cell.upperLimit) {
                   // Calculate the tax for the income within this bracket
                  tax += (taxableIncome - cell.lowerLimit) * cell.rate / 100;
                  break;// Exit the loop once the applicable bracket is found
                } else {
                   // Calculate the tax for the full range of the current bracket
                  tax += (cell.upperLimit - cell.lowerLimit) * cell.rate / 100;
          
                }
              }
          
              return tax;// Return the calculated tax amount
            }
          
            // Function to calculate NHIF rates in effect from 1 April 2015 based on gross salary
            function calculateNHIF(grossSalary) {
              const nhifRates = [
                { lowerLimit: 0, upperLimit: 5999, rate: 150 },
                { lowerLimit: 6000, upperLimit: 7999, rate: 300 },
                { lowerLimit: 8000, upperLimit: 11999, rate: 400 },
                { lowerLimit: 12000, upperLimit: 14999, rate: 500 },
                { lowerLimit: 15000, upperLimit: 19999, rate: 600 },
                { lowerLimit: 20000, upperLimit: 24999, rate: 750 },
                { lowerLimit: 25000, upperLimit: 29999, rate: 850 },
                { lowerLimit: 30000, upperLimit: 34999, rate: 900 },
                { lowerLimit: 35000, upperLimit: 39999, rate: 950 },
                { lowerLimit: 40000, upperLimit: 44999, rate: 1000 },
                { lowerLimit: 45000, upperLimit: 49999, rate: 1100 },
                { lowerLimit: 50000, upperLimit: 59999, rate: 1200 },
                { lowerLimit: 60000, upperLimit: 69999, rate: 1300 },
                { lowerLimit: 70000, upperLimit: 79999, rate: 1400 },
                { lowerLimit: 80000, upperLimit: 89999, rate: 1500 },
                { lowerLimit: 90000, upperLimit: 99999, rate: 1600 },
                { lowerLimit: 100000, upperLimit: Infinity, rate: 1700 }
              ];
          
              for (const bracket of nhifRates) {
                  // If gross salary falls within the current bracket, return the corresponding rate
                if (grossSalary <= bracket.upperLimit) {
                  return bracket.rate;
                }
              }
              return 0; //fallback if no bracket matches (shouldn't happen with valid input
            }
          
            // Function to calculate NSSF deductions based on gross salary
            function calculateNSSF(grossSalary) {
              const nssfRate = 0.06; // 6% of gross salary
              const nssfMax = 18000;  // The maximum salary considered for NSSF contribution
              // Calculate NSSF as 6% of gross salary, capped at the maximum NSSF contribution
              return Math.min(grossSalary, nssfMax) * nssfRate;
            }
           // Function to calculate the housing levy (1.5% of gross salary)
          function calculateHousingLevy(grossSalary) {
            const housingLevyRate = 0.015;  // 1.5% housing levy
             // Calculate housing levy based on gross salary
            return grossSalary * housingLevyRate;
          }
            // Function to calculate net salary
            function calculateNetSalary(basicSalary, benefits) {
              // Calculate gross salary by adding basic salary and benefits
              const grossSalary = basicSalary + benefits;
              // Calculate deductions
            const nssfDeduction = calculateNSSF(grossSalary);  // NSSF
            const nhifDeduction = calculateNHIF(grossSalary);  // NHIF
            const taxableIncome = grossSalary - nssfDeduction; // Taxable Income after NSSF
            const payee = calculatePAYE(taxableIncome);        // PAYE
            const housingLevy = calculateHousingLevy(grossSalary); // Housing Levy
          
            // Calculate net salary by subtracting all deductions from gross salary
            const netSalary = grossSalary - payee - nhifDeduction - nssfDeduction - housingLevy;
          
            return {
              grossSalary,
              taxableIncome,
              payee,
              nhifDeduction,
              nssfDeduction,
              housingLevy,
              netSalary
            };
          }
          
            // for instance lets say the :
            const basicSalary = 50000;
            const benefits = 5000;
          
            const salaryBreakdown = calculateNetSalary(basicSalary, benefits);
          
          console.log("Gross Salary:", salaryBreakdown.grossSalary);
          console.log("Taxable Income:", salaryBreakdown.taxableIncome);
          console.log("PAYE (Tax):", salaryBreakdown.payee);
          console.log("NHIF Deduction:", salaryBreakdown.nhifDeduction);
          console.log("NSSF Deduction:", salaryBreakdown.nssfDeduction);
          console.log("Housing Levy:", salaryBreakdown.housingLevy);
          console.log("Net Salary:", salaryBreakdown.netSalary);    
    