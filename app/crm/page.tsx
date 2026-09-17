"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-provider";
import type { SavedProspect } from "@/lib/types";

const stages: SavedProspect["stage"][] = ["New", "Contacted", "Visit planned", "Won"];
const stageStyles: Record<SavedProspect["stage"], string> = { New: "bg-[#eef5f1] text-[#426254]", Contacted: "bg-[#e8efff] text-[#40569c]", "Visit planned": "bg-[#fef3c7] text-[#976307]", Won: "bg-[#e6f7f3] text-[#0b6d64]" };

export default function CRMPage() {
  const { saved, updateStage, addNote } = useApp();
  const [openId, setOpenId] = useState(saved[0]?.id ?? "");
  const selected = saved.find((item) => item.id === openId) ?? saved[0];
  return <AppShell title="My CRM" subtitle="Track the prospects you want to turn into conversations." actions={<Link href="/prospects" className="btn-primary"><Icon name="plus" className="h-4 w-4" />Add prospect</Link>}>
    {!saved.length ? <div className="panel p-10 text-center"><Icon name="users" className="mx-auto h-9 w-9 text-[#8a9b91]" /><h2 className="mt-4 text-xl font-black">Your CRM is ready</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#718078]">Save any fictional business from the prospect finder to start your pipeline.</p><Link href="/prospects" className="btn-primary mt-5">Find prospects</Link></div> : <section className="grid gap-5 xl:grid-cols-[340px_1fr]"><div className="panel overflow-hidden"><div className="border-b border-[#e6ece8] px-5 py-4"><p className="font-black">Active prospects <span className="text-[#718078]">({saved.length})</span></p></div><div className="max-h-[620px] overflow-auto p-2">{saved.map((prospect) => <button key={prospect.id} onClick={() => setOpenId(prospect.id)} className={`w-full rounded-xl p-3.5 text-left transition ${selected?.id === prospect.id ? "bg-[#e6f7f3]" : "hover:bg-[#f5f8f6]"}`}><div className="flex items-start justify-between gap-2"><p className="font-bold text-[#20362c]">{prospect.name}</p><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${stageStyles[prospect.stage]}`}>{prospect.stage}</span></div><p className="mt-1 text-xs text-[#718078]">{prospect.category} · {prospect.distance}</p><p className="mt-2 line-clamp-1 text-xs text-[#66776e]">{prospect.notes[0]?.text ?? "No notes yet"}</p></button>)}</div></div>
      {selected && <ProspectDetail prospect={selected} updateStage={updateStage} addNote={addNote} />}
    </section>}
  </AppShell>;
}

function ProspectDetail({ prospect, updateStage, addNote }: { prospect: SavedProspect; updateStage: (id: string, stage: SavedProspect["stage"]) => void; addNote: (id: string, text: string) => void }) {
  const [note, setNote] = useState("");
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!note.trim()) return; addNote(prospect.id, note.trim()); setNote(""); };
  return <div className="panel min-w-0 overflow-hidden"><div className="border-b border-[#e6ece8] p-5 sm:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-black tracking-tight">{prospect.name}</h2><span className="rounded-full bg-[#e6f7f3] px-2.5 py-1 text-xs font-black text-[#0b6d64]">{prospect.score}% match</span></div><p className="mt-2 text-sm font-semibold text-[#557166]">{prospect.category}</p><p className="mt-4 flex items-center gap-1.5 text-sm text-[#718078]"><Icon name="pin" className="h-4 w-4 text-[#0f766e]" />{prospect.address} · {prospect.distance}</p></div><label className="block shrink-0"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#718078]">Stage</span><select className="field min-w-40 py-2.5 font-bold" value={prospect.stage} onChange={(e) => updateStage(prospect.id, e.target.value as SavedProspect["stage"])}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label></div><div className="mt-5 rounded-xl bg-[#f1f6f3] p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#718078]">Suggested opening</p><p className="mt-1 text-sm leading-6 text-[#405349]">“I work with independent retailers nearby to make their checkout simpler. Is that something you ever review at {prospect.name}?”</p></div></div><div className="p-5 sm:p-7"><div className="flex items-center gap-2"><Icon name="note" className="h-5 w-5 text-[#0f766e]" /><h3 className="text-lg font-black">Notes & activity</h3></div><form onSubmit={submit} className="mt-4"><label className="sr-only" htmlFor="note">Add a note</label><textarea id="note" className="field min-h-24 resize-y" placeholder="Log a visit, conversation, or next step…" value={note} onChange={(e) => setNote(e.target.value)} /><div className="mt-3 flex justify-end"><button type="submit" className="btn-primary"><Icon name="plus" className="h-4 w-4" />Add note</button></div></form><div className="mt-6 space-y-4">{prospect.notes.map((item) => <article className="border-l-2 border-[#96d8cb] pl-4" key={item.id}><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold">Sales note</p><time className="text-xs text-[#829087]">{item.createdAt}</time></div><p className="mt-1.5 text-sm leading-6 text-[#66776e]">{item.text}</p></article>)}{!prospect.notes.length && <p className="rounded-xl bg-[#f5f8f6] p-4 text-sm text-[#718078]">No notes yet. Capture what you learn in the field.</p>}</div></div></div>;
}
