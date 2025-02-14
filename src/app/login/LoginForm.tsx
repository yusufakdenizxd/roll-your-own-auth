"use client";

import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "./actions";

function LoginForm() {
  const [state, action] = useActionState(login, undefined);
  return (
    <form className="flex max-w-[300px] flex-col gap-2" action={action}>
      <div className="flex flex-col gap-2">
        <input type="text" name="email" id="email" placeholder="Email" />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <div className="flex flex-col gap-2">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      Login
    </button>
  );
}

export default LoginForm;
