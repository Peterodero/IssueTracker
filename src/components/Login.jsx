import { useState } from "react";
import { passwordValidator } from "../util/validation";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../util/http";
import ErrorBlock from "./UI/ErrorBlock";

export default function Login() {
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: () => {
      navigate("/landing");
    },
  });

  function handleFormSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);

    const data = Object.fromEntries(fd.entries());

    const validatePassword = passwordValidator(data.password, 6);

    setPasswordIsValid(validatePassword);

    if (!passwordIsValid) {
      throw new Error("Please fill in all fields");
    }

    mutate(data);

    console.log(data);
  }

  return (
    <div className="flex flex-col items-center mt-20 ">
      <div className="mb-2">
        <h2 className="mb-2 text-3xl font-bold">Welcome!</h2>
        <p className="font-semibold">Please login to continue..</p>
      </div>

      <form
        className="flex flex-col md:gap-6 lg:gap-6 gap-1 justify-center shadow bg-white md:w-3/8 p-1 md:p-10 rounded-xl"
        onSubmit={handleFormSubmit}
      >
        <div className="px-2">
          <div className="my-4 flex flex-col">
            <label className="mb-1">Username</label>
            <input
              name="username"
              placeholder="Enter your username"
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
        </div>

        <div className="flex justify-center">
          <button className="w-3/4 py-2 bg-blue-500 text-white rounded">
            {isPending ? "Logging In..." : "Login"}
          </button>
        </div>
      </form>
      {isError && (
        <ErrorBlock
          title="Failed to login."
          message={
            error.info?.message ||
            "Failed to login.Check your details and log in again!"
          }
        />
      )}
    </div>
  );
}
