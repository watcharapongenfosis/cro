import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenfosisLogo } from "@/components/icons/logo";

export const revalidate = 0; // Revalidate the page on every request

async function getLeads() {
  const leadsCollection = collection(db, "croLeads");
  const q = query(leadsCollection, orderBy("createdAt", "desc"));
  const leadsSnapshot = await getDocs(q);
  const leadsList = leadsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      companyName: data.companyName,
      contactNumber: data.contactNumber,
      email: data.email,
      productInfo: data.productInfo,
      budget: data.budget,
      interestedServices: data.interestedServices.join(", "),
      createdAt: data.createdAt.toDate().toLocaleString(),
      appointmentDateTime: data.appointmentDateTime || "",
    };
  });
  return leadsList;
}

export default async function AdminPage() {
  const leads = await getLeads();

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center bg-background p-4 font-body md:p-8">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col items-center text-center mb-8">
            <GenfosisLogo className="h-auto w-48" />
            <h1 className="font-headline mt-4 text-3xl font-bold text-primary">
                Admin Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
                View and export CRO inquiries.
            </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>CRO Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminDashboard leads={leads} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
