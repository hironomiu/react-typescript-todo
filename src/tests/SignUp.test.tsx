import { render, screen } from "@testing-library/react"
import SignUp from "../components/SignUp"

test("renders h1", () => {
  render(<SignUp />)
  expect(screen.getByRole("h1")).toBeTruthy()
})
