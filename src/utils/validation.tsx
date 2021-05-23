export const isValidEmailFormat = (email: string) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regex.test(email)
}

export const isValidRequiredInput = (...args: string[]) => {
  let validator: boolean = true
  args.map((arg) => (arg.length === 0 ? (validator = false) : null))
  return validator
}
