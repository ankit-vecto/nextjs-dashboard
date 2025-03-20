"use client";

import { handlePathologyReportDetails } from "@/app/lib/actions";
import { PathologyReport } from "@/app/lib/definitions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { z } from "zod";
import { pathologySchema } from "../validationSchema";

export default function PathologyForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<PathologyReport>({
    name: "",
    age: "",
    gender: "",
    phone: "",
    patientId: "",
    testDate: "",
    testName: "",
    collectedBy: "",
    collectionDate: "",
    reportDate: "",
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
        case "patientId":
          pathologySchema.shape.patientId.parse(value);
          break;
        case "testDate":
          pathologySchema.shape.testDate.parse(value);
          break;
        case "testName":
          pathologySchema.shape.testName.parse(value);
          break;
        case "collectedBy":
          pathologySchema.shape.collectedBy.parse(value);
          break;
        case "collectionDate":
          pathologySchema.shape.collectionDate.parse(value);
          break;
        case "reportDate":
          pathologySchema.shape.reportDate.parse(value);
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
      await handlePathologyReportDetails(formData).then((res) => {
        if (res) {
          alert("Report submitted successfully!");
          setFormData({
            name: "",
            age: "",
            gender: "",
            phone: "",
            patientId: "",
            testDate: "",
            testName: "",
            collectedBy: "",
            collectionDate: "",
            reportDate: "",
          });
          router.push("/dashboard");
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
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
          />
          {errors.patientId && (
            <span style={{ color: "red" }}>{errors.patientId}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Date of Test</label>
          <input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
            max={new Date().toISOString().slice(0, 10)}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.testDate && `border-red-500`
            }`}
          />
          {errors.testDate && (
            <span style={{ color: "red" }}>{errors.testDate}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Test Name</label>
          <select
            name="testName"
            value={formData.testName}
            onChange={handleChange}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.testName && `border-red-500`
            }`}
          >
            <option value="">Select</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Test">Urine Test</option>
            <option value="COVID Test">COVID Test</option>
          </select>
          {errors.testName && (
            <span style={{ color: "red" }}>{errors.testName}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Sample Collected By
          </label>
          <input
            type="text"
            name="collectedBy"
            value={formData.collectedBy}
            onChange={handleChange}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.collectedBy && `border-red-500`
            }`}
          />
          {errors.collectedBy && (
            <span style={{ color: "red" }}>{errors.collectedBy}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Sample Collection Date & Time
          </label>
          <input
            type="datetime-local"
            name="collectionDate"
            value={formData.collectionDate}
            onChange={handleChange}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.collectionDate && `border-red-500`
            }`}
          />
          {errors.collectionDate && (
            <span style={{ color: "red" }}>{errors.collectionDate}</span>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Report Generation Date
          </label>
          <input
            type="date"
            name="reportDate"
            value={formData.reportDate}
            onChange={handleChange}
            className={`peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500 ${
              errors.reportDate && `border-red-500`
            }`}
          />

          {errors.reportDate && (
            <span style={{ color: "red" }}>{errors.reportDate}</span>
          )}
        </div>
      </div>
      <div className="flex w-full justify-end gap-5">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg mt-4 bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back to Dashboard
        </Link>
        <button
          type="submit"
          className=" bg-blue-500 text-white p-2 rounded-lg mt-4"
        >
          Submit Report
        </button>
      </div>
    </form>
  );
}
