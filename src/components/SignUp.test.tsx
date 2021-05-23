import { render, screen } from "@testing-library/react"
import SignUp from "./SignUp"
import { AuthProvider } from "../contexts/auth"

test("renders h1", () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  )

  expect(screen.getByText("SignUp")).toBeTruthy()
})
