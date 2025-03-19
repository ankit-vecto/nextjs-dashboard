import React, { Suspense } from "react";
import SignupForm from "../ui/signup-form";
import AcmeLogo from "../ui/acme-logo";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex items-center justify-center md:h-screen mt-20">
      <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36 justify-between">
          <AcmeLogo />
          <Link
            href="/login"
            className="flex items-center gap-5 rounded-lg bg-white px-6 py-3 text-sm font-medium transition-colors "
          >
            <span>Login</span>
          </Link>
        </div>
        <div className="max-w-[400px] relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-32">
          <Suspense>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default page;
