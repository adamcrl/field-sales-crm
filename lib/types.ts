export type Prospect = {
  id: string;
  name: string;
  category: string;
  address: string;
  distance: string;
  score: number;
  contact: string;
  reason: string;
  tags: string[];
};

export type Note = { id: string; text: string; createdAt: string };

export type SavedProspect = Prospect & {
  stage: "New" | "Contacted" | "Visit planned" | "Won";
  notes: Note[];
  savedAt: string;
};

export type Profile = {
  productName: string;
  oneLiner: string;
  industries: string;
  teamSize: string;
  locations: string;
  buyer: string;
};
