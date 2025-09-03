import { GenfosisLogo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center bg-background p-4 font-body md:p-8">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
                <GenfosisLogo className="h-auto w-48" />
            </div>
            <p className="mb-8 mt-2 text-lg text-muted-foreground">
              แสดงหน้านี้ให้เจ้าหน้าที่เพื่อรับของที่ระลึก
            </p>
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/">กลับไปหน้าแรก</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
