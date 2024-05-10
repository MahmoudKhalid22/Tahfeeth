const { fahrenheitToCelsius, celsiusToFahrenheit } = require("../src/math");

test("from fahrenheit to celsius", () => {
  const cel = fahrenheitToCelsius(50);
  expect(cel).toBe(10);
});

test("from celsius to fahrenheit", () => {
  const fah = celsiusToFahrenheit(10);
  expect(fah).toBe(50);
});
