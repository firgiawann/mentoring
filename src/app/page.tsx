import { GalleryStrip } from "@/components/public/gallery-strip";
import { Hero } from "@/components/public/hero";
import { ProgramOverview } from "@/components/public/program-overview";
import { PublicMaterials } from "@/components/public/public-materials";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { UpcomingAgenda } from "@/components/public/upcoming-agenda";

export default function HomePage() {
  return <><SiteHeader /><main id="main-content"><Hero /><ProgramOverview /><UpcomingAgenda /><PublicMaterials /><GalleryStrip /></main><SiteFooter /></>;
}
