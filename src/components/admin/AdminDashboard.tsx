"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Download, Save } from "lucide-react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  companyName: string;
  contactNumber: string;
  email: string;
  productInfo: string;
  budget: string;
  interestedServices: string;
  createdAt: string;
  appointmentDateTime: string;
}

interface AdminDashboardProps {
  leads: Lead[];
}

export function AdminDashboard({ leads: initialLeads }: AdminDashboardProps) {
  const { toast } = useToast();
  const [leads, setLeads] = useState(initialLeads);
  const [appointments, setAppointments] = useState<Record<string, string>>(
    initialLeads.reduce((acc, lead) => {
      acc[lead.id] = lead.appointmentDateTime || "";
      return acc;
    }, {} as Record<string, string>)
  );

  const handleAppointmentChange = (leadId: string, value: string) => {
    setAppointments(prev => ({ ...prev, [leadId]: value }));
  };

  const handleSaveAppointment = async (leadId: string) => {
    const appointmentDateTime = appointments[leadId];
    try {
      const leadRef = doc(db, "croLeads", leadId);
      await updateDoc(leadRef, {
        appointmentDateTime,
      });
      toast({
        title: "Success",
        description: "Appointment saved successfully.",
      });
       // Update local state to avoid re-fetching
       setLeads(prevLeads => prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, appointmentDateTime } : lead
      ));
    } catch (error) {
      console.error("Error saving appointment: ", error);
      toast({
        title: "Error",
        description: "Failed to save appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads.map(lead => ({
      ...lead,
      appointmentDateTime: appointments[lead.id] || lead.appointmentDateTime,
    })));
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
              <TableHead>Appointment Date/Time</TableHead>
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
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="YYYY-MM-DD HH:MM"
                      value={appointments[lead.id] || ''}
                      onChange={(e) => handleAppointmentChange(lead.id, e.target.value)}
                      className="w-48"
                    />
                    <Button size="sm" onClick={() => handleSaveAppointment(lead.id)}>
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
