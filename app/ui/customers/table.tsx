import { CustomersTableType } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Image from "next/image";

export default async function CustomersTable({
  fetchFilteredCustomer,
}: {
  fetchFilteredCustomer: CustomersTableType[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              {/* Mobile View */}
              <div className="md:hidden">
                {fetchFilteredCustomer.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-4 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex flex-col gap-4 border-b pb-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={customer.image_url}
                          className="rounded-full"
                          alt={`${customer.name}'s profile picture`}
                          width={48}
                          height={48}
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {customer.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-800">Invoices</p>
                          <p>{customer.total_invoices}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-800">
                            Total Pending
                          </p>
                          <p>{customer.total_pending}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-800">
                            Total Paid
                          </p>
                          <p>{customer.total_paid}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop/Tablet View */}
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Invoices
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {fetchFilteredCustomer?.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_invoices}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_pending}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
