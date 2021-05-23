import { render, screen } from "@testing-library/react"
import SignIn from "../components/SignIn"

test("renders h1", () => {
  render(<SignIn />)
  expect(screen.getByRole("h1")).toBeTruthy()
})
