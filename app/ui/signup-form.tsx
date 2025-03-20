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
import { useRouter } from "next/navigation";
import { register } from "../lib/actions";
import { signupSchema } from "./validationSchema";
import { z } from "zod";
interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const navigation = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined
  );
  console.log(errorMessage, "errorserrorserrors");
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    try {
      switch (name) {
        case "name":
          signupSchema.shape.name.parse(value);
          break;
        case "email":
          signupSchema.shape.email.parse(value);
          break;
        case "password":
          signupSchema.shape.password.parse(value);
          break;
        case "confirmPassword":
          signupSchema.shape.confirmPassword.parse(value);
          if (user.password !== value) {
            throw new z.ZodError([
              {
                path: ["confirmPassword"],
                message: "Passwords do not match",
                code: "custom",
              },
            ]);
          }
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      signupSchema.parse(user);
      setErrors({});
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      startTransition(async () => {
        formAction(formData);
        setUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        if (isPending) {
          if (!errorMessage) {
            navigation.push("/login");
          }
        }
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
          Create a new account.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className={`${
                  errors.name && "border-red-500"
                } peer block w-full pl-10 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500`}
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleChange}
              />

              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>

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
                placeholder="Enter your email address"
                value={user.email}
                onChange={handleChange}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
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
                placeholder="Enter password"
                value={user.password}
                onChange={handleChange}
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </div>

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={`${
                  errors.confirmPassword && "border-red-500"
                } peer block w-full pl-10 rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500`}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={user.confirmPassword}
                onChange={handleChange}
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>{errors.confirmPassword}</span>
            )}
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit" disabled={isPending}>
          {isPending ? "Signing Up..." : "Sign Up"}
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
