#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic math operations:
 *   +  Addition
 *   -  Subtraction
 *   *  Multiplication
 *   /  Division (handles division by zero gracefully)
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *
 * Examples:
 *   node calculator.js 5 + 3
 *   node calculator.js 10 - 4
 *   node calculator.js 6 "*" 7
 *   node calculator.js 8 / 2
 */

// Addition: returns the sum of two numbers
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of two numbers
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of two numbers
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of two numbers, guarding against division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

// Maps supported operator symbols/aliases to their corresponding functions
const operations = {
  "+": add,
  add: add,
  "-": subtract,
  subtract: subtract,
  "*": multiply,
  x: multiply,
  multiply: multiply,
  "/": divide,
  divide: divide,
};

function calculate(num1, operator, num2) {
  const operation = operations[operator];
  if (!operation) {
    throw new Error(
      `Unsupported operator "${operator}". Supported operators: + - * /`
    );
  }
  return operation(num1, num2);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error("Usage: node calculator.js <number1> <operator> <number2>");
    console.error('Example: node calculator.js 5 + 3');
    process.exitCode = 1;
    return;
  }

  const [rawNum1, operator, rawNum2] = args;
  const num1 = Number(rawNum1);
  const num2 = Number(rawNum2);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    console.error("Both operands must be valid numbers.");
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(num1, operator, num2);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

// Only run the CLI entry point when this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, calculate };
