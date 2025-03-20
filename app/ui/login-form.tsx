"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/button";
import { startTransition, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "../lib/actions";
import { loginSchema } from "./validationSchema";
import { z } from "zod";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [user, setUser] = useState({
    email: "",
    password: "",
    redirectTo: callbackUrl,
  });
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    if (user.email && user.password) {
    }
    try {
      switch (name) {
        case "email":
          loginSchema.shape.email.parse(value);
          break;
        case "password":
          loginSchema.shape.password.parse(value);
          break;
      }
      setErrors((prev) => {
        return Object.fromEntries(
          Object.entries(prev).filter(([key]) => key !== name)
        );
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      loginSchema.parse(user);
      setErrors({});
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      startTransition(() => {
        formAction(formData);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={`${
                  errors.email && "border-red-500"
                } peer block w-full pl-10 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500`}
                id="email"
                type="email"
                name="email"
                value={user.email}
                placeholder="Enter your email address"
                onChange={handleChange}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.email && (
              <div className="mt-2 text-sm text-red-500">{errors.email}</div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className={`${
                  errors.password && "border-red-500"
                } peer block w-full pl-10 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500`}
                id="password"
                type="password"
                name="password"
                value={user.password}
                placeholder="Enter password"
                onChange={handleChange}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.password && (
              <div className="mt-2 text-sm text-red-500">{errors.password}</div>
            )}
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={user.redirectTo} />
        <Button className="mt-4 w-full" type="submit" disabled={isPending}>
          {isPending ? "Login..." : "Login"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
