"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";

const navigation = [
  { href: "/", label: "Overview", icon: "home" as const },
  { href: "/profile", label: "Product & ICP", icon: "target" as const },
  { href: "/prospects", label: "Find prospects", icon: "map" as const },
  { href: "/crm", label: "My CRM", icon: "users" as const },
];

export function AppShell({ title, subtitle, actions, children }: { title: string; subtitle: string; actions?: React.ReactNode; children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="min-h-screen lg:flex">
    <aside className="fixed inset-x-0 bottom-0 z-20 border-t border-[#dfe8e2] bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
      <Link href="/" className="hidden items-center gap-3 px-3 lg:flex"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0f766e] text-lg font-black text-white">F</span><span><span className="block text-base font-black tracking-tight">Fieldnote</span><span className="block text-xs text-[#6b7d73]">Field sales workspace</span></span></Link>
      <nav className="mx-auto flex w-full max-w-md items-center justify-around lg:mt-10 lg:flex-col lg:items-stretch lg:gap-1" aria-label="Primary navigation">
        {navigation.map((item) => {
          const active = pathname === item.href;
          return <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold transition lg:flex-row lg:gap-3 lg:px-3 lg:py-3 lg:text-sm ${active ? "bg-[#e6f7f3] text-[#0b6d64]" : "text-[#718078] hover:bg-[#f1f5f2] hover:text-[#315044]"}`}><Icon name={item.icon} className="h-5 w-5" />{item.label}</Link>;
        })}
      </nav>
      <div className="mt-auto hidden rounded-2xl bg-[#f1f6f3] p-4 lg:block"><p className="text-xs font-bold text-[#315044]">Today’s focus</p><p className="mt-1 text-sm font-semibold leading-snug">Two visits planned nearby.</p><Link href="/crm" className="mt-3 inline-flex text-xs font-bold text-[#0f766e]">Open CRM <span className="ml-1">→</span></Link></div>
    </aside>
    <main className="min-w-0 flex-1 pb-24 lg:pb-10"><div className="mx-auto max-w-6xl px-4 py-7 sm:px-7 sm:py-10 lg:px-10"><header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Fieldnote / Dublin</p><h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#15231f] sm:text-4xl">{title}</h1><p className="mt-2 max-w-xl text-sm leading-6 text-[#66776e] sm:text-base">{subtitle}</p></div>{actions && <div className="shrink-0">{actions}</div>}</header>{children}</div></main>
  </div>;
}
