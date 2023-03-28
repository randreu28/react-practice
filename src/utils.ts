export function titleCase(str: string) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    if (i !== 0) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
  }
  return splitStr.join("");
}

export function validatePhoneNumber(value: string) {
  const regex = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return regex.test(value) || "Please enter a valid phone number";
}
