import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
};

// If we are testing a component that takes data as prop
// We need to send the props similar to the ones he received.
test("Quantity, title and photo are printed on the screen according to the incoming data.", () => {
  render(
    <Card
      item={item}
      amount={5}
      addToBasket={() => {}}
      clearFromBasket={() => {}}
    />
  );

  //call quantity span
  const amount = screen.getByTestId("amount");

  // check if the quantity is 5
  expect(amount.textContent).toBe("5");

  // Is choclate text printed on the screen?
  screen.getByText("Chocolate");

  //get image element
  const image = screen.getByAltText("kind-picture");

  // Is the src value "/images/chocolate.png"?
  expect(image).toHaveAttribute("src", item.imagePath);
});

test("Butonlara tıklanınca fonksiiyonlar doğru pametreler ile çalışır", async () => {
  const user = userEvent.setup();

  // Since we will not send the original functions sent from the scoops component as props, it is necessary to define a mock function that imitates the main function in order to check whether the functions work correctly at the right time with the right parameters.
  const addMockFn = jest.fn();
  const clearMockFn = jest.fn();

  render(
    <Card
      item={item}
      amount={3}
      addToBasket={addMockFn}
      clearFromBasket={clearMockFn}
    />
  );

  //get buttons
  const addBtn = screen.getByRole("button", { name: /Add/i });
  const clearBtn = screen.getByRole("button", { name: /Reset/i });

  //Click the Add button
  await user.click(addBtn);

  // Did the addToBasket function work with the correct parameters?
  expect(addMockFn).toHaveBeenCalledWith(item);

  //Click the Reset button
  await user.click(clearBtn);

  // Did the clearFromBasket function work with the correct parameters?
  expect(clearMockFn).toHaveBeenCalledWith("Chocolate");
});
