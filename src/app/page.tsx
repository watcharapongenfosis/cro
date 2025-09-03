import { CROLeadForm } from "@/components/pulsecheck/CROLeadForm";
import { GenfosisLogo } from "@/components/icons/logo";

export default function CROLeadPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center bg-background p-4 font-body md:p-8">
      <div className="w-full max-w-3xl">
        <div className="rounded-lg border bg-card text-card-foreground shadow-lg">
          <div className="p-8">
            <div className="flex flex-col items-center text-center">
              <GenfosisLogo className="h-auto w-40" />
              <h1 className="font-headline mt-4 text-3xl font-bold text-primary">
                CRO Services Inquiry
              </h1>
              <p className="mb-6 mt-2 text-muted-foreground">
                Please provide your information below to help us understand your
                needs.
              </p>
            </div>
            <CROLeadForm />
          </div>
        </div>
      </div>
    </main>
  );
}
