import { render, screen } from "@testing-library/react"
import SignIn from "./SignIn"
import { AuthProvider } from "../contexts/auth"

test("renders h1", () => {
  render(
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  )

  expect(screen.getAllByText("SignIn")).toBeTruthy()
})
