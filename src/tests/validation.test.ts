import { isValidEmailFormat } from "../utils/validation"

test("isValidEmailFormat truthy", () => {
  expect(isValidEmailFormat("hoge@hoge.com")).toBeTruthy()
})

test("isValidEmailFormat falsehy", () => {
  expect(isValidEmailFormat("hoge")).toBeFalsy()
})
