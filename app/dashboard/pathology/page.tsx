import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PathologyForm from "@/app/ui/pathology/pathology-report-form";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Pathology Report",
            href: "/dashboard/pathology",
            active: true,
          },
        ]}
      />
      <Suspense>
        <PathologyForm />
      </Suspense>
    </div>
  );
};

export default Page;
