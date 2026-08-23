export type CompletionPolicy = "read" | "activity" | "mentor_verification";
export type MaterialSensitivity = "standard" | "private_reflection" | "support";

export type MaterialBlock =
  | { id: string; type: "intro"; body: string }
  | { id: string; type: "key_points"; title: string; items: string[] }
  | { id: string; type: "fact"; title: string; body: string; sourceLabel: string }
  | { id: string; type: "link"; title: string; description: string; href: string; domain: string; reviewedAt: string }
  | { id: string; type: "checklist"; title: string; items: string[] }
  | { id: string; type: "reflection"; title: string; prompt: string; privacyNote: string }
  | { id: string; type: "scenario"; title: string; prompt: string; options: { id: string; label: string; feedback: string; recommended: boolean }[] }
  | { id: string; type: "true_false"; statement: string; answer: boolean; explanation: string }
  | { id: string; type: "ordering"; title: string; items: { id: string; label: string; order: number }[] }
  | { id: string; type: "resource"; title: string; body: string; actionLabel?: string; href?: string };

export type MaterialExperience = {
  materialId: string;
  sourcePages: [number, number];
  readTimeMinutes: number;
  objectives: string[];
  blocks: MaterialBlock[];
  completionPolicy: CompletionPolicy;
  sensitivity: MaterialSensitivity;
  lastReviewedAt: string;
};
