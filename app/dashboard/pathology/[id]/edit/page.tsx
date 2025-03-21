import { fetchReportDetailsById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditReportFrom from "@/app/ui/pathology/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [report] = await Promise.all([fetchReportDetailsById(id)]);
  const details = [report];

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Reports", href: "/dashboard/pathology" },
          {
            label: "Edit Report",
            href: `/dashboard/pathology/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditReportFrom details={details} id={id} />
    </main>
  );
}
