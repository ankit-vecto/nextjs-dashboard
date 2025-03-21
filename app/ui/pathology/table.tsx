import { fetchPathologyReports } from "@/app/lib/data";
import { format } from "date-fns";
import { Deletereport, UptateReport, ViewDetails } from "../invoices/buttons";
import Pagination from "../invoices/pagination";

export default async function PathologyReportsTable({
  query,
  currentPage,
  totalPages,
}: {
  query: string;
  currentPage: number;
  totalPages: number;
}) {
  const reports = await fetchPathologyReports(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        {reports.length <= 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l7 7a4 4 0 0 0 5.6 0L21 8" />
              <polyline points="3 8 12 3 21 8" />
              <line x1="12" y1="3" x2="12" y2="21" />
            </svg>
            <h1 className="mt-4 text-lg font-semibold">No Reports Available</h1>
            <p className="text-sm text-gray-500">
              No pathology reports found. Please add a new report to get
              started.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {/* Mobile View */}
            <div className="md:hidden">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="mb-2 w-full rounded-md bg-white p-4 shadow"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="text-lg font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500">
                        Patient ID: {report.patient_id}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex justify-end gap-3">
                        <UptateReport id={report.id} />
                        <Deletereport id={report.id} />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <p className="text-sm font-medium">Age:</p>
                    <p className="text-sm">{report.age}</p>
                    <p className="text-sm font-medium">Gender:</p>
                    <p className="text-sm">{report.gender}</p>
                    <p className="text-sm font-medium">Phone:</p>
                    <p className="text-sm">{report.phone}</p>
                    <p className="text-sm font-medium">Test Name:</p>
                    <p className="text-sm">{report.test_name}</p>
                    <p className="text-sm font-medium">Date of Test:</p>
                    <p className="text-sm">
                      {new Date(report.test_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium">Sample Collected By:</p>
                    <p className="text-sm">{report.collected_by}</p>
                    <p className="text-sm font-medium">
                      Sample Collection Date & Time:
                    </p>
                    <p className="text-sm">
                      {format(
                        new Date(report.collection_date),
                        "dd/MM/yyyy HH:mm a"
                      )}
                    </p>
                    <p className="text-sm font-medium">
                      Report Generation Date:
                    </p>
                    <p className="text-sm">
                      {new Date(report.report_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="w-full overflow-x-auto">
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th className="px-3 py-5 text-sm font-medium">Name</th>
                    <th className="px-3 py-5 text-sm font-medium">Age</th>
                    <th className="px-3 py-5 text-sm font-medium">Gender</th>
                    <th className="px-3 py-5 text-sm font-medium">Phone</th>
                    <th className="px-3 py-5 text-sm font-medium">Test Name</th>
                    <th className="px-3 py-5 text-sm font-medium">
                      Date of Test
                    </th>
                    {/*<th className="px-3 py-5 text-sm font-medium">
                      Sample Collected By
                    </th>
                    <th className="px-3 py-5 text-sm font-medium">
                      Sample Collection Date & Time
                    </th>
                    <th className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {reports?.map((report, index) => (
                    <tr
                      key={index}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap p-3 pl-6 pr-3">
                        {report.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {report.age}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {report.gender}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {report.phone}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-3">
                        {report.patient_id}
                      </td> */}
                      <td className="whitespace-nowrap px-3 py-3">
                        {report.test_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {new Date(report.test_date).toLocaleDateString()}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-3">
                        {report.collected_by}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {format(
                          new Date(report.collection_date),
                          "dd/MM/yyyy HH:mm a"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {new Date(report.report_date).toLocaleDateString()}
                      </td> */}
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <ViewDetails id={report.id} />
                          <UptateReport id={report.id} />
                          <Deletereport id={report.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {reports.length > 0 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
