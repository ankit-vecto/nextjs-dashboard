import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36 justify-between">
          <AcmeLogo />
          <Link
            href="/signup"
            className="flex items-center gap-5 rounded-lg bg-white px-6 py-3 text-sm font-medium transition-colors "
          >
            <span>Sign Up</span>
          </Link>
        </div>
        <div className="max-w-[400px] relative mx-auto flex w-full flex-col space-y-2.5 p-4 md:-mt-32">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
