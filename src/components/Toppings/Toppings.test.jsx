import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toppings from ".";

test("Adding and subtracting sauces affect the total", async () => {
  const user = userEvent.setup();

  //1) render the component
  render(<Toppings />);

  //2) get total span
  const total = screen.getByTestId("total");

  //3) get all the sauce checkboxes
  const toppings = await screen.findAllByRole("checkbox");

  //4) check if total charge is 0
  expect(total.textContent).toBe("0");

  //5) check that all checkboxes are unticked
  toppings.forEach((i) => expect(i).not.toBeChecked());

  //6) click on one of the sauces
  await user.click(toppings[0]);

  //7) Check if total is equal to 3
  expect(total.textContent).toBe("3");

  //8) click on another sauce
  await user.click(toppings[4]);

  //9) check if total is equal to 6
  expect(total.textContent).toBe("6");

  //10) Take out one of the addne sauces
  await user.click(toppings[4]);

  //11) Check if total is equal to 3
  expect(total.textContent).toBe("3");

  //12) Addne take out the last sauce
  await user.click(toppings[0]);

  //13) Check if total is equal to 0
  expect(total.textContent).toBe("0");
});
