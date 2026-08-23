"use client";

import { Download, FileSpreadsheet, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PrototypeState } from "@/features/prototype/types";

export function ExportPanel({ state, onReset }: { state: PrototypeState; onReset: () => void }) {
  function downloadAttendance() {
    const rows = ["meeting_id,mentee_id,status,waktu", ...state.attendanceRecords.map((item) => `${item.meetingId},${item.menteeId},${item.status},${item.recordedAt}`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "presensi-ptik-d1-2026.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
  return <div className="export-grid"><article><FileSpreadsheet size={38} /><h3>Rekap presensi</h3><p>{state.attendanceRecords.length} catatan siap diekspor sebagai CSV.</p><Button onClick={downloadAttendance}><Download size={17} /> Unduh CSV</Button></article><article><RotateCcw size={38} /><h3>Reset prototype</h3><p>Kembalikan semua interaksi ke data awal tanpa menghapus file apa pun.</p><Button onClick={onReset} variant="danger"><RotateCcw size={17} /> Reset demo</Button></article></div>;
}
