"use client";

import React, { useRef } from "react";
import { PathologyReport } from "@/app/lib/definitions";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ReportTable = ({ details }: { details: PathologyReport }) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!tableRef.current) return;

    const canvas = await html2canvas(tableRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("Pathology_Report.pdf");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border shadow-lg rounded-lg">
      <div ref={tableRef} className="p-6 bg-white">
        <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
          <h1 className="text-2xl font-semibold">Pathology Report</h1>
        </div>

        <table className="w-full border border-gray-300">
          <tbody>
            {[
              { label: "Patient Name", value: details.name },
              { label: "Patient Id", value: details.patient_id || "N/A" },
              { label: "Age", value: details.age },
              { label: "Gender", value: details.gender },
              { label: "Phone", value: details.phone },
              { label: "Test Name", value: details.test_name },
              {
                label: "Test Date",
                value: new Date(details.test_date).toLocaleDateString(),
              },
              {
                label: "Collection Date",
                value: format(
                  new Date(details.collection_date),
                  "dd/MM/yyyy HH:mm a"
                ),
              },
              { label: "Collected By", value: details.collected_by },
              {
                label: "Report Date",
                value: new Date(details.report_date).toLocaleDateString(),
              },
            ].map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3 border-r border-gray-300 font-medium">
                  {item.label}
                </td>
                <td className="p-3">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end p-6">
        <button
          onClick={generatePDF}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ReportTable;
