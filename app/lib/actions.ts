"use server";

import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import signupHandler, { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { PathologyReport } from "./definitions";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log(error);
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    throw new Error("Failed to delete invoice.");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  console.log(formData, "formDataformData");

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  const userDetails = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const req = {
    body: userDetails,
    method: "POST",
  };
  const response = await signupHandler(req);
  if (response) {
    return response;
  }
}
export async function handlePathologyReportDetails(formData: PathologyReport) {
  try {
    await sql`INSERT INTO pathology_reports (
            name, age, gender, phone, patient_id, test_date, test_name, 
            collected_by, collection_date, report_date
        ) VALUES (
            ${formData.name},
            ${formData.age},
            ${formData.gender},
            ${formData.phone},
            ${formData.patient_id || null},
            ${formData.test_date},
            ${formData.test_name},
            ${formData.collected_by},
            ${formData.collection_date},
            ${formData.report_date}
        )`;
    return "Pathology report stored successfully.";
  } catch (error) {
    console.error("Error storing pathology report:", error);
  }
}

export default async function handleUpdateReport(
  report: PathologyReport,
  id: string
) {
  try {
    await sql`UPDATE pathology_reports SET
            name = ${report.name},
            age = ${report.age},
            gender = ${report.gender},
            phone = ${report.phone},
            patient_id = ${report.patient_id || null},
            test_date = ${report.test_date},
            test_name = ${report.test_name},
            collected_by = ${report.collected_by},
            collection_date = ${report.collection_date},
            report_date = ${report.report_date}
        WHERE id = ${id}`;
    return "Pathology report updated successfully.";
  } catch (error) {
    console.error("Error updating pathology report:", error);
  }
}

export async function deleteReport(id: string) {
  try {
    await sql`DELETE FROM pathology_reports WHERE id = ${id}`;
    revalidatePath("/dashboard/pathology");
  } catch (error) {
    console.error("Failed to delete report:", error);
    throw new Error("Failed to delete report.");
  }
}
