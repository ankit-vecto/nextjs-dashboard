import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const fetchFilteredCustomer = await fetchFilteredCustomers(query);

  return (
    <>
      <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable fetchFilteredCustomer={fetchFilteredCustomer} />
      </Suspense>
    </>
  );
}
