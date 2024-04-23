import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";

test("Button activation based on approval of the conditions", () => {
  //1) The component to be tested is rendered
  render(<Form />);

  //2) call necessary elements
  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  //3) Check that the checkbox is not ticked
  expect(checkbox).not.toBeChecked();

  //4) check that the button is inactive
  expect(button).toBeDisabled();

  //5) click on the checkbox
  fireEvent.click(checkbox);

  //6) check that the button is active
  expect(button).toBeEnabled();

  //7) Click on checkbox
  fireEvent.click(checkbox);

  //8) check that the button is inactive
  expect(button).toBeDisabled();
});

test("A notification appears depending on the hover status of the confirmation button.", () => {
  //1) render the form
  render(<Form />);

  //2) get required elements
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const alert = screen.getByText(/to you really/i); //insensetive

  //3) tick the checkbox (button becomes active)
  fireEvent.click(checkbox);

  //4) check that the notification is not on the screen
  expect(alert).not.toBeVisible();

  //5) move the mouse to the button
  fireEvent.mouseEnter(button);

  //6) check if the notification appears on the screen
  expect(alert).toBeVisible();

  //7) release the mouse from the button
  fireEvent.mouseLeave(button);

  //8) check if the notification is gone from the screen
  expect(alert).not.toBeVisible();
});
