//This program calculates your total savings balance over time, using the formula: (initial deposit * (1 + (interest rate/number of times compounded per year) ^ number of times compounded per year * number of years)) + (monthly deposit * ((1 + interest rate/number of times compounded per year) ^ number of times compounded per year * number of years - 1) and all that divided by (interest rate / number of times compounded per year))

//This program assumes the number of times compounded per year is 12 (monthly), as that is quite standard for most savings accounts.

//Allow the program to access console inputs
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

//create variables without initializing values, so we can access them globally. We will assign values later
let initialDeposit;
let years;
let interestRate;
let monthlyDeposit;

//ask the user what their initial deposit is. Parse the answer to a float and assign it ot the initialDeposit variable
readline.question(
  "What is your initial savings deposit? Enter an amount without a dollar sign: ",
  (answer) => {
    initialDeposit = parseFloat(answer);

    //output an error to the console if the user enters a non-number or a negative number
    if (isNaN(initialDeposit) || initialDeposit <= 0) {
      console.log("Sorry! That wasn't a valid number.");
      readline.close();
    }

    //ask the user how many years they will be saving for and parse it to the variable years
    readline.question(
      "Great! Now, how many years will you be saving it for? ",
      (answer2) => {
        years = parseFloat(answer2);

        //output an error to the console if the user enters a non-number or a negative number
        if (isNaN(years) || years <= 0) {
          console.log("Sorry! That wasn't a valid number of years.");
          readline.close();
        }

        //ask the user to input the interest rate and convert it to a decimal, and then assign it to the variable interestRate
        readline.question(
          "That's a good number of years! Now, what is your annual interest rate? Enter a number from 1-100, without the percentage sign (for example, enter 5.5 for a 5.5% interest rate): ",
          (answer3) => {
            interestRate = parseFloat(answer3) / 100;

            //output an error to the console if the user enters a non-number or a negative number
            if (isNaN(interestRate) || interestRate <= 0 || interestRate > 1) {
              console.log(
                "Please enter a valid annual interest rate between 0 and 100.",
              );
              readline.close();
            }

            //Ask how much the user will be contributing monthly. Assign it to the variable monthlyDeposit
            readline.question(
              "Now, how much money will you be adding every month: ",
              (answer4) => {
                monthlyDeposit = parseFloat(answer4);

                //output an error to the console if the user enters a non-number or a negative number
                if (isNaN(monthlyDeposit) || monthlyDeposit < 0) {
                  console.log("Sorry! That's not a valid number.");
                  readline.close();
                }

                // first, calculate the interest rate divided by the number of times compounded per year, which will be used frequently in the formula and call it compoundInterest
                let compoundInterest = interestRate / 12;

                // calculate the amount in the parenthesis in the first part of the formula: 1 + the interest rate divided by the number of times compounded per year. This will be reused in the second part of the formula
                let secondStep = 1 + compoundInterest;

                // next, calculate the factor we will be exponentiating to in the formula, which is the number of years multiplied by the number of times compounded per year
                let exponent = years * 12;

                //calculate the final amount we will be multplying the original deposit by, which will calculate total balance without monthly contributions
                let fourthStep = secondStep ** exponent;
                // reuse what we got in the first step and subtract one, which is the multiplying factor in the second part of the formula. We will multiply this by the monthly contribution in the dividend in the second part of the formula
                let fifthStep = fourthStep - 1;
                // now we multiple the initial contribution by the rest of the equation in the first part of the formula
                let sixthStep = initialDeposit * fourthStep;

                //now we multiply the monthly contribution by the rest of the equation to get the dividend in the second part of the formula
                let seventhStep = monthlyDeposit * fifthStep;

                //now we divide the dividend in the second part of the formula by its divisor, which is the interest rate / by the amount of times compounded per year
                let eighthStep = seventhStep / compoundInterest;

                //finally, we add the two parts of the formula together
                let endSavings = sixthStep + eighthStep;

                //logs the output to the console. Note that it depends on monthly compounding
                console.log(
                  `After ${years} years, your savings account will have around: $` +
                    endSavings.toFixed() +
                    "! That's a lot! Note that your actual ending balance might vary slightly if compounding takes place at a frequency other than monthly!",
                );

                readline.close();
              },
            );
          },
        );
      },
    );
  },
);
