export function emailValidator(email) {
  const isLowerCase = email === email.toLowerCase();
  const startsWithLetter = /^[a-z]/.test(email);
  const containsLetter = /[a-z]/.test(email);
  const emailPattern = /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/;

  return emailPattern.test(email) && containsLetter && isLowerCase && startsWithLetter
}

export function passwordValidator(value, minLength) {
    return value && value.length >= minLength;
}
