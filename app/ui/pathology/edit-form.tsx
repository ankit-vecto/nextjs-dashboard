"use client";
import { PathologyReport, PathologyUpdatedReport } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { pathologySchema } from "../validationSchema";
import { z } from "zod";
import Link from "next/link";
import handleUpdateReport from "@/app/lib/actions";

const EditReportFrom = ({
  details,
  id,
}: {
  details: PathologyReport[];
  id: string;
}) => {
  const report = details[0];
  const router = useRouter();
  const [formData, setFormData] = useState<PathologyUpdatedReport>({
    id: id,
    name: report.name,
    age: String(report.age),
    gender: report.gender,
    phone: report.phone,
    patient_id: report.patient_id,
    test_date: new Date(report.test_date).toISOString(),
    test_name: report.test_name,
    collected_by: report.collected_by,
    collection_date: new Date(report.collection_date).toISOString(),
    report_date: new Date(report.report_date).toISOString(),
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    try {
      switch (name) {
        case "name":
          pathologySchema.shape.name.parse(value);
          break;
        case "age":
          pathologySchema.shape.age.parse(value);
          break;
        case "gender":
          pathologySchema.shape.gender.parse(value);
          break;
        case "phone":
          pathologySchema.shape.phone.parse(value);
          break;
        case "patient_id":
          pathologySchema.shape.patient_id.parse(value);
          break;
        case "test_date":
          pathologySchema.shape.test_date.parse(value);
          break;
        case "test_name":
          pathologySchema.shape.test_name.parse(value);
          break;
        case "collected_by":
          pathologySchema.shape.collected_by.parse(value);
          break;
        case "collection_date":
          pathologySchema.shape.collection_date.parse(value);
          break;
        case "report_date":
          pathologySchema.shape.report_date.parse(value);
          break;
      }
      setErrors((prev) => {
        return Object.fromEntries(
          Object.entries(prev).filter(([key]) => key !== name)
        );
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      pathologySchema.parse(formData);
      setErrors({});
      handleUpdateReport(formData, id).then((res) => {
        if (res === "Pathology report updated successfully.") {
          router.push("/dashboard/pathology");
        }
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="rounded-md bg-gray-50 p-4 md:p-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${
              errors.name && "border-red-500"
            } peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500`}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`${
                errors.age && "border-red-500"
              } peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500`}
            />

            {errors.age && <span style={{ color: "red" }}>{errors.age}</span>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
                errors.gender && `border-red-500`
              }`}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span style={{ color: "red" }}>{errors.gender}</span>
            )}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            minLength={10}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.phone && `border-red-500`
            }`}
          />
          {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Patient ID (Optional)
          </label>
          <input
            type="text"
            name="patient_id"
            value={formData.patient_id || ""}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
          />
          {errors.patient_id && (
            <span style={{ color: "red" }}>{errors.patient_id}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Date of Test</label>
          <input
            type="date"
            name="test_date"
            value={new Date(formData.test_date).toISOString().split("T")[0]}
            onChange={handleChange}
            max={new Date().toISOString().slice(0, 10)}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.test_date && `border-red-500`
            }`}
          />
          {errors.test_date && (
            <span style={{ color: "red" }}>{errors.test_date}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Test Name</label>
          <select
            name="test_name"
            value={formData.test_name}
            onChange={handleChange}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.test_name && `border-red-500`
            }`}
          >
            <option value="">Select</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Test">Urine Test</option>
            <option value="COVID Test">COVID Test</option>
          </select>
          {errors.test_name && (
            <span style={{ color: "red" }}>{errors.test_name}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Sample Collected By
          </label>
          <input
            type="text"
            name="collected_by"
            value={formData.collected_by}
            onChange={handleChange}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.collected_by && `border-red-500`
            }`}
          />
          {errors.collected_by && (
            <span style={{ color: "red" }}>{errors.collected_by}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Sample Collection Date & Time
          </label>
          <input
            type="datetime-local"
            name="collection_date"
            value={new Date(formData.collection_date)
              .toISOString()
              .slice(0, 16)}
            onChange={handleChange}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.collection_date && `border-red-500`
            }`}
          />
          {errors.collection_date && (
            <span style={{ color: "red" }}>{errors.collection_date}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Report Generation Date
          </label>
          <input
            type="date"
            name="report_date"
            value={new Date(formData.report_date).toISOString().split("T")[0]}
            onChange={handleChange}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.report_date && `border-red-500`
            }`}
          />
          {errors.report_date && (
            <span style={{ color: "red" }}>{errors.report_date}</span>
          )}
        </div>
      </div>
      <div className="flex w-full justify-end gap-5">
        <Link
          href="/dashboard/pathology"
          className="flex items-center justify-center rounded-lg mt-4 bg-gray-100 px-6 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-40"
        >
          Back
        </Link>
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-500 text-white rounded-lg mt-4 px-6 py-2 text-sm font-medium w-40"
        >
          Save Report
        </button>
      </div>
    </form>
  );
};
export default EditReportFrom;
