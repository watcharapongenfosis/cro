"use client";

import React from "react";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Lead {
  id: string;
  companyName: string;
  contactNumber: string;
  email: string;
  productInfo: string;
  budget: string;
  interestedServices: string;
  createdAt: string;
}

interface AdminDashboardProps {
  leads: Lead[];
}

export function AdminDashboard({ leads }: AdminDashboardProps) {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CROLeads");
    XLSX.writeFile(workbook, "cro_leads.xlsx");
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={exportToExcel} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Product Info</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Interested Services</TableHead>
              <TableHead>Submitted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.companyName}</TableCell>
                <TableCell>{lead.contactNumber}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell className="max-w-xs truncate">{lead.productInfo}</TableCell>
                <TableCell>{lead.budget}</TableCell>
                <TableCell className="max-w-xs truncate">{lead.interestedServices}</TableCell>
                <TableCell>{lead.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
