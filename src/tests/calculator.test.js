/**
 * calculator.test.js
 *
 * Unit tests for the CLI calculator's core arithmetic functions:
 *   add, subtract, multiply, divide
 *
 * Includes the example operations from images/calc-basic-operations.png:
 *   2 + 3, 10 - 4, 45 * 2, 20 / 5
 * plus additional coverage for negatives, decimals, and edge cases
 * such as division by zero.
 */

const { add, subtract, multiply, divide, calculate } = require("../calculator");

describe("add", () => {
  test("2 + 3 = 5 (image example)", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds two positive numbers", () => {
    expect(add(4, 6)).toBe(10);
  });

  test("adds negative numbers", () => {
    expect(add(-5, -7)).toBe(-12);
  });

  test("adds a positive and a negative number", () => {
    expect(add(10, -4)).toBe(6);
  });

  test("adds decimal numbers", () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test("adding zero returns the other operand", () => {
    expect(add(0, 5)).toBe(5);
  });
});

describe("subtract", () => {
  test("10 - 4 = 6 (image example)", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("subtracts two positive numbers", () => {
    expect(subtract(20, 8)).toBe(12);
  });

  test("subtracting a larger number yields a negative result", () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test("subtracts negative numbers", () => {
    expect(subtract(-5, -3)).toBe(-2);
  });

  test("subtracts decimal numbers", () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });
});

describe("multiply", () => {
  test("45 * 2 = 90 (image example)", () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test("multiplies two positive numbers", () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test("multiplying by zero returns zero", () => {
    expect(multiply(100, 0)).toBe(0);
  });

  test("multiplies negative numbers", () => {
    expect(multiply(-4, 5)).toBe(-20);
    expect(multiply(-4, -5)).toBe(20);
  });

  test("multiplies decimal numbers", () => {
    expect(multiply(1.5, 2)).toBeCloseTo(3);
  });
});

describe("divide", () => {
  test("20 / 5 = 4 (image example)", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("divides two positive numbers", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("divides negative numbers", () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(-10, -2)).toBe(5);
  });

  test("divides decimal numbers", () => {
    expect(divide(5, 2)).toBeCloseTo(2.5);
  });

  test("dividing zero by a non-zero number returns zero", () => {
    expect(divide(0, 5)).toBe(0);
  });

  test("throws an error when dividing by zero", () => {
    expect(() => divide(5, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("calculate (operator dispatch)", () => {
  test.each([
    ["2", "+", "3", 5],
    ["10", "-", "4", 6],
    ["45", "*", "2", 90],
    ["20", "/", "5", 4],
  ])("calculate(%s, %s, %s) = %d", (a, op, b, expected) => {
    expect(calculate(Number(a), op, Number(b))).toBe(expected);
  });

  test("supports word aliases for operators", () => {
    expect(calculate(2, "add", 3)).toBe(5);
    expect(calculate(10, "subtract", 4)).toBe(6);
    expect(calculate(45, "multiply", 2)).toBe(90);
    expect(calculate(20, "divide", 5)).toBe(4);
  });

  test("throws an error for an unsupported operator", () => {
    expect(() => calculate(1, "%", 2)).toThrow(/Unsupported operator/);
  });

  test("throws an error when dividing by zero via calculate", () => {
    expect(() => calculate(8, "/", 0)).toThrow("Division by zero is not allowed.");
  });
});
