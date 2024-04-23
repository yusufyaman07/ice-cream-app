import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

test("Cards are printed on the screen for data coming from the API", async () => {
  render(<Scoops />);

  //get images printed on the screen
  const images = await screen.findAllByAltText("kind-picture");

  // Is the number of incoming images greater than or equal to 1?
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Addme and Resetma processes of the varieties work", async () => {
  // usereventin setup
  const user = userEvent.setup();

  // print component to screen
  render(<Scoops />);

  //call all Addme and Resetma buttons
  const addButtons = await screen.findAllByRole("button", { name: /Add/i });

  const delButtons = await screen.findAllByRole("button", { name: /Reset/i });

  // call total price element
  const total = screen.getByTestId("total");

  // check if total price is 0
  expect(total.textContent).toBe("0");

  //Click one of the Add buttons
  await user.click(addButtons[0]);

  // check if the total price is 20
  expect(total.textContent).toBe("20");

  // Double click on one of the Add buttons
  await user.dblClick(addButtons[2]);

  //check if the total price is 60
  expect(total.textContent).toBe("60");

  //remove first added
  await user.click(delButtons[0]);

  // check if the total price is 40
  expect(total.textContent).toBe("40");

  //remove last added
  await user.click(delButtons[2]);

  // check if total price is 0
  expect(total.textContent).toBe("0");
});
