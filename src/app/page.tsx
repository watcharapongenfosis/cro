import { CROLeadForm } from "@/components/pulsecheck/CROLeadForm";
import { GenfosisLogo } from "@/components/icons/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CROLeadPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center bg-background p-4 font-body md:p-8">
      <div className="w-full max-w-3xl">
        <div className="rounded-lg border bg-card text-card-foreground shadow-lg">
          <div className="p-8">
            <div className="flex flex-col items-center text-center">
              <GenfosisLogo className="h-auto w-48" />
              <h1 className="font-headline mt-4 text-3xl font-bold text-primary">
                BIOSMART TESTING Inquiry
              </h1>
              <p className="mb-6 mt-2 text-muted-foreground">
                Please provide your information below to help us understand your
                needs.
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <CROLeadForm />
          </div>
        </div>
      </div>
    </main>
  );
}
