"use client";

import { handlePathologyReportDetails } from "@/app/lib/actions";
import { PathologyReport } from "@/app/lib/definitions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

export default function PathologyForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<PathologyReport>({
    name: "",
    age: "",
    gender: "",
    phone: "",
    patientId: "",
    testDate: "",
    testName: "Blood Test",
    collectedBy: "",
    collectionDate: "",
    reportDate: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await handlePathologyReportDetails(formData);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Pathology Report</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Details */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Patient ID (Optional)
          </label>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Test Details */}
        <div>
          <label className="block text-sm font-medium">Date of Test</label>
          <input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Test Name</label>
          <select
            name="testName"
            value={formData.testName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="Blood Test">Blood Test</option>
            <option value="Urine Test">Urine Test</option>
            <option value="COVID Test">COVID Test</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Sample Collected By
          </label>
          <input
            type="text"
            name="collectedBy"
            value={formData.collectedBy}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Sample Collection Date & Time
          </label>
          <input
            type="datetime-local"
            name="collectionDate"
            value={formData.collectionDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Report Generation Date
          </label>
          <input
            type="date"
            name="reportDate"
            value={formData.reportDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Submit Report
        </button>
      </form>
      <Link href="/dashboard" className="block text-center text-blue-600 mt-4">
        Back to Dashboard
      </Link>
    </div>
  );
}
