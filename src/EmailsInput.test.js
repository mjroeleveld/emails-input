import EmailsInput from './EmailsInput';

// ######################################################################
// I implemented only a bare minimum of tests (for illustrative purposes)
// ######################################################################

const createInputElem = () =>
  new EmailsInput(document.createElement("div"));

test("addValue()", () => {
    const input = createInputElem();
    input.addValue("john@gmail.com");
    const values = input.getAllValues();

    expect(values.length).toBe(1);
    expect(values[0].toString()).toBe("john@gmail.com");
});

test("getAllValues()", () => {
    const input = createInputElem();
    input.addValue("john@gmail.com");
    input.addValue("invalid");
    const values = input.getAllValues();

    expect(values.length).toBe(2);
    expect(values).toEqual([
        "john@gmail.com",
        "invalid",
    ]);
});

test("getValidValues()", () => {
    const input = createInputElem();
    input.addValue("john@gmail.com");
    input.addValue("invalid");
    const values = input.getValidValues();

    expect(values.length).toBe(1);
    expect(values).toEqual([
        "john@gmail.com",
    ]);
});

test("replaceAllValues()", () => {
    const input = createInputElem();
    input.addValue("john@gmail.com");
    input.addValue("invalid");
    input.replaceAllValues([
      "alice@hotmail.com"
    ]);
    const values = input.getAllValues();

    expect(values.length).toBe(1);
    expect(values).toEqual([
        "alice@hotmail.com",
    ]);
});

test("subscribe()", () => {
    const input = createInputElem();
    const listener = jest.fn();
    input.subscribe(listener);
    input.addValue("john@gmail.com");

    expect(listener).toHaveBeenCalled();
    expect(listener.mock.calls[0][0]).toEqual(["john@gmail.com"]);
});

test("unsubscribe()", () => {
    const input = createInputElem();
    const listener = jest.fn();
    input.subscribe(listener);
    input.unsubscribe(listener);
    input.addValue("john@gmail.com");

    expect(listener).toBeCalledTimes(0);
});

test("reset()", () => {
    const input = createInputElem();
    const listener = jest.fn();
    input.subscribe(listener);
    input.unsubscribe(listener);
    input.addValue("john@gmail.com");
    input.reset();
    const values = input.getAllValues();

    expect(values.length).toBe(0);
    expect(listener).toHaveBeenCalledTimes(0);
});
