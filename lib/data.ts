import type { Profile, Prospect, SavedProspect } from "@/lib/types";

export const defaultProfile: Profile = {
  productName: "Kite POS",
  oneLiner: "A simple point-of-sale system for busy independent shops.",
  industries: "Specialty retail, cafés, independent grocers",
  teamSize: "5–50 employees",
  locations: "Dublin city centre + 5 km",
  buyer: "Owner, operator, or store manager",
};

export const prospects: Prospect[] = [
  {
    id: "northstar-bikes", name: "Northstar Cycles", category: "Specialty retail", address: "14 Camden Street Lower", distance: "0.4 km", score: 94,
    contact: "Maya O'Connell, Owner", reason: "Independent retailer with high foot traffic and a growing repairs desk.", tags: ["Great fit", "Walk-in"],
  },
  {
    id: "table-and-twig", name: "Table & Twig", category: "Homewares", address: "8 Drury Street", distance: "0.7 km", score: 89,
    contact: "Fionn Byrne, Store manager", reason: "Multi-brand shop that fits the target team size and has two locations.", tags: ["2 locations", "Retail"],
  },
  {
    id: "common-ground", name: "Common Ground Coffee", category: "Café", address: "11 Wexford Street", distance: "0.9 km", score: 86,
    contact: "Aisling Keane, Co-founder", reason: "Busy independent café with counter service and seasonal retail products.", tags: ["Café", "Busy"],
  },
  {
    id: "moss-and-marrow", name: "Moss & Marrow", category: "Independent grocer", address: "25 Fade Street", distance: "1.1 km", score: 82,
    contact: "Rory Walsh, Operations lead", reason: "Local grocer with a small team and a new click-and-collect counter.", tags: ["Grocer", "New counter"],
  },
  {
    id: "paper-folk", name: "Paper Folk", category: "Gifts & stationery", address: "5 South Great George's Street", distance: "1.3 km", score: 77,
    contact: "Niamh Doyle, Founder", reason: "Design-led gift shop with regular card transactions and owner on site.", tags: ["Owner-led", "Cards"],
  },
  {
    id: "juniper-books", name: "Juniper Books", category: "Bookshop", address: "3 Dawson Lane", distance: "1.6 km", score: 73,
    contact: "Callum Reid, Manager", reason: "Established bookshop with events and a compact team of eight.", tags: ["Events", "Independent"],
  },
];

export const starterSavedProspects: SavedProspect[] = [
  { ...prospects[0], stage: "Visit planned", savedAt: "Today", notes: [{ id: "note-1", text: "Maya is usually in before 10am. Drop by with the café case study.", createdAt: "Today, 09:20" }] },
  { ...prospects[2], stage: "Contacted", savedAt: "Yesterday", notes: [{ id: "note-2", text: "Brief chat with Aisling — current terminal contract renews in November.", createdAt: "Yesterday" }] },
];
