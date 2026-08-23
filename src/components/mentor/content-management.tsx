import { Eye, ImagePlus, Megaphone, PencilLine } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PublicContent } from "@/features/prototype/types";

export function ContentManagement({ contents }: { contents: PublicContent[] }) {
  return <div className="content-admin-grid">{contents.map((content) => <article key={content.id}><div className="content-admin-icon">{content.type === "announcement" ? <Megaphone /> : <ImagePlus />}</div><Badge tone={content.visibility === "public" ? "green" : "muted"}>{content.visibility}</Badge><h3>{content.title}</h3><p>{content.excerpt}</p><div className="table-actions"><Button variant="ghost"><Eye size={16} /> Preview</Button><Button variant="ghost"><PencilLine size={16} /> Edit</Button></div></article>)}</div>;
}
