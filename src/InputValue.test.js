import InputValue from './InputValue';

describe("validate()", () => {
  test("valid address", () => {
    const input = new InputValue("john@doe.nl");
    const valid = input.isValid();

    expect(valid).toBe(true);
  });

  test("invalid address", () => {
    const input = new InputValue("invalid.address");
    const valid = input.isValid();

    expect(valid).toBe(false);
  });
});

test("toString()", () => {
  const input = new InputValue("john@doe.nl");
  const value = input.toString();

  expect(value).toBe("john@doe.nl");
});
