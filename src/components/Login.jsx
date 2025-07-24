import { useState } from "react";
import { emailValidator, passwordValidator } from "../util/validation";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const navigate = useNavigate();

  function handleFormSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());

    const validateEmail = emailValidator(data.email);
    const validatePassword = passwordValidator(data.password, 6);

    setEmailIsValid(validateEmail);
    setPasswordIsValid(validatePassword);

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    navigate('/landing')
    console.log(data.email);
  }

  return (
    <div className="flex flex-col items-center mt-25 ">
      <div className="mb-4">
        <h2 className="mb-3 text-3xl font-bold">Welcome!</h2>
        <p className="font-semibold">Please login to continue..</p>
      </div>

      <form
        className="flex flex-col md:gap-6 lg:gap-6 gap-1 justify-center shadow bg-white md:w-3/8 p-2 md:p-10 rounded-xl"
        onSubmit={handleFormSubmit}
      >
        <div className="px-2">
          <div className="my-4 flex flex-col">
            <label className="mb-1">Username</label>
            <input
              name="email"
              placeholder="Enter your email"
              required
              className="border rounded py-1 px-2"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="border rounded py-1 px-2"
            />
          </div>
          {!passwordIsValid && (
            <p className="text-red-400">
              Invalid password.Password should be atleast 6 characters
            </p>
          )}
          {!emailIsValid && (
            <p className="text-red-400">Email invalid.Try again!</p>
          )}
        </div>

        <div className="flex justify-center">
          <button className="w-3/4 py-2 bg-blue-500 text-white rounded">Login</button>
        </div>
      </form>
    </div>
  );
}
