import InputValue from './InputValue';

// ######################################################################
// I implemented only a bare minimum of tests (for illustrative purposes)
// ######################################################################

describe("validate()", () => {
  test("valid address", () => {
    const input = new InputValue("john@doe.nl");
    const valid = input.validate();

    expect(valid).toBe(true);
  });

  test("invalid address", () => {
    const input = new InputValue("invalid.address");
    const valid = input.validate();

    expect(valid).toBe(false);
  });
});

test("toString()", () => {
  const input = new InputValue("john@doe.nl");
  const value = input.toString();

  expect(value).toBe("john@doe.nl");
});
