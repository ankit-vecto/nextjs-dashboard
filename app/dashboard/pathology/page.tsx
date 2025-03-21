import { fetchReportsPages } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { CreateReport } from "@/app/ui/invoices/buttons";
import PathologyReportsTable from "@/app/ui/pathology/table";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import React, { Suspense } from "react";

const Page = async (props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchReportsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Reports</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search reports..." />
        <CreateReport />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <PathologyReportsTable
          query={query}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default Page;
