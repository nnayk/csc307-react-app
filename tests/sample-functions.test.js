const myFunctions = require("./sample-functions.js");

test("Testing mySum -- success", () => {
  const expected = 30;

  const result = myFunctions.mySum(12, 18);

  expect(expected).toBe(result);
});

test("Testing containsNumber -- simple ", () => {
  const expected = true;

  const result = myFunctions.containsNumbers("abc2");

  expect(expected).toBe(true);
});

test("Testing containsNumber -- emptry string error", () => {
  const expected = false;

  const result = myFunctions.containsNumbers("");

  expect(expected).toBe(true);
});

test("Testing containsNumber -- boolean error", () => {
  const expected = false;

  const result = myFunctions.containsNumbers(true);

  expect(expected).toBe(true);
});
