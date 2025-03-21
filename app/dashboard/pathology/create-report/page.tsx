"use client";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import PathologyForm from "@/app/ui/pathology/pathology-report-form";
import React from "react";

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Reports", href: "/dashboard/pathology" },
          {
            label: "Edit Report",
            href: `/dashboard/pathology/[id]/edit`,
            active: true,
          },
        ]}
      />
      <PathologyForm />
    </main>
  );
}
