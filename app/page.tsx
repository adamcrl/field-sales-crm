"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Icon } from "@/components/icons";
import { prospects } from "@/lib/data";
import { useApp } from "@/components/app-provider";

function Stat({ label, value, detail, tone }: { label: string; value: string | number; detail: string; tone: string }) {
  return <div className="panel p-5"><div className={`mb-4 grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon name="spark" className="h-5 w-5" /></div><p className="text-3xl font-black tracking-tight">{value}</p><p className="mt-1 text-sm font-bold text-[#31443b]">{label}</p><p className="mt-2 text-xs leading-5 text-[#718078]">{detail}</p></div>;
}

export default function DashboardPage() {
  const { profile, saved } = useApp();
  const planned = saved.filter((item) => item.stage === "Visit planned");
  const recentlySaved = saved.slice(0, 3);
  return <AppShell title="Good morning, Alex" subtitle="Here’s your field sales plan for today." actions={<Link href="/prospects" className="btn-primary"><Icon name="plus" className="h-4 w-4" />Find prospects</Link>}>
    <section className="grid gap-3 sm:grid-cols-3">
      <Stat label="Prospects saved" value={saved.length} detail="Your active local pipeline" tone="bg-[#e6f7f3] text-[#0f766e]" />
      <Stat label="Visits planned" value={planned.length} detail="Ready for your next route" tone="bg-[#fef3c7] text-[#a16207]" />
      <Stat label="Strong matches nearby" value={prospects.filter((item) => item.score >= 80).length} detail="Ranked against your ICP" tone="bg-[#e9edff] text-[#5146c9]" />
    </section>

    <section className="mt-7 grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
      <div className="panel overflow-hidden"><div className="flex items-center justify-between border-b border-[#e6ece8] px-5 py-5 sm:px-6"><div><p className="text-lg font-black tracking-tight">Today’s route</p><p className="mt-1 text-sm text-[#718078]">Keep it close, keep it useful.</p></div><Link href="/crm" className="text-sm font-bold text-[#0f766e]">View all</Link></div><div className="p-3 sm:p-4">
        {planned.length ? planned.map((item, index) => <div key={item.id} className="flex gap-3 rounded-xl p-3.5 transition hover:bg-[#f5f8f6]"><div className="flex flex-col items-center"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0f766e] text-xs font-black text-white">{index + 1}</span>{index !== planned.length - 1 && <span className="mt-1 h-full min-h-8 border-l border-dashed border-[#b7c8bf]" />}</div><div className="min-w-0 pb-3"><p className="font-bold text-[#20362c]">{item.name}</p><p className="mt-1 flex items-center gap-1 text-sm text-[#718078]"><Icon name="pin" className="h-3.5 w-3.5" />{item.address} · {item.distance}</p><p className="mt-2 rounded-lg bg-[#e6f7f3] px-2.5 py-1 text-xs font-semibold text-[#0b6d64]">{item.notes[0]?.text ?? "Add a visit note"}</p></div></div>) : <p className="p-5 text-sm text-[#718078]">No visits planned yet. Move a prospect forward in your CRM.</p>}
      </div></div>
      <div className="panel p-5 sm:p-6"><p className="eyebrow">Your targeting</p><h2 className="mt-2 text-xl font-black tracking-tight">{profile.productName}</h2><p className="mt-2 text-sm leading-6 text-[#66776e]">{profile.oneLiner}</p><div className="mt-5 space-y-4 border-t border-[#e6ece8] pt-5"><div><p className="text-xs font-bold uppercase tracking-wider text-[#809088]">Best for</p><p className="mt-1 text-sm font-semibold text-[#31443b]">{profile.industries}</p></div><div><p className="text-xs font-bold uppercase tracking-wider text-[#809088]">Buyer</p><p className="mt-1 text-sm font-semibold text-[#31443b]">{profile.buyer}</p></div></div><Link href="/profile" className="btn-secondary mt-6 w-full">Refine product & ICP <Icon name="arrow" className="h-4 w-4" /></Link></div>
    </section>

    <section className="mt-7"><div className="mb-4 flex items-end justify-between"><div><p className="text-lg font-black tracking-tight">Recently saved</p><p className="mt-1 text-sm text-[#718078]">Momentum from your latest fieldwork.</p></div><Link href="/crm" className="text-sm font-bold text-[#0f766e]">Open CRM</Link></div><div className="grid gap-3 md:grid-cols-3">{recentlySaved.map((item) => <div className="panel p-4" key={item.id}><div className="flex items-start justify-between gap-3"><div><p className="font-bold">{item.name}</p><p className="mt-1 text-xs text-[#718078]">{item.category}</p></div><span className="rounded-full bg-[#eef5f1] px-2.5 py-1 text-xs font-bold text-[#426254]">{item.stage}</span></div><p className="mt-4 text-sm text-[#66776e]">{item.address}</p></div>)}</div></section>
  </AppShell>;
}
