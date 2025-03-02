import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Debt } from "@/app/components/Debt";
import { moneySigns } from "@/app/constants/moneySigns";
import { expect } from "@storybook/test";

test("renders borrowed debt", () => {
  render(
    <Debt
      type="borrowed"
      date="1980-01-01"
      amount={1000}
      currency="USD"
      subject="Bob"
      status="unpaid"
    />,
  );

  expect(screen.getByText("Borrowed")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();
  expect(screen.getByText(`${moneySigns.USD}1000`)).toBeInTheDocument();
});
