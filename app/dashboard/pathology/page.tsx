import PathologyForm from "@/app/ui/pathology/pathology-report-form";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <PathologyForm />
    </Suspense>
  );
};

export default Page;
