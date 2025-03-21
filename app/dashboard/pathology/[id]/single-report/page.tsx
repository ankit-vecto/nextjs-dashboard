"use server";

import { fetchReportDetailsById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import ReportTable from "@/app/ui/pathology/single-repot";
import React from "react";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [report] = await Promise.all([fetchReportDetailsById(id)]);
  const details = [report];
  return (
    <div>
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Reports", href: "/dashboard/pathology" },
            {
              label: "Download PDF",
              href: `/dashboard/pathology/${id}/single-report`,
              active: true,
            },
          ]}
        />
        <ReportTable details={details[0]} />
      </main>
    </div>
  );
}
