import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { photography } from "@/data/photography";
import { designProjects } from "@/data/design";
import { writing } from "@/data/writing";
import { spokenWord } from "@/data/spokenword";
import { events } from "@/data/events";
import { techProjects } from "@/data/projects";
import type { PortfolioItem } from "@/data/types";

const items: PortfolioItem[] = [...photography, ...designProjects, ...techProjects, ...writing, ...spokenWord, ...events];

export function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = items.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const links = [
    ...("relatedLinks" in item && item.relatedLinks ? item.relatedLinks : []),
    ...("galleryLink" in item && item.galleryLink ? [{ label: "Open gallery", url: item.galleryLink }] : []),
    ...("behanceLink" in item && item.behanceLink ? [{ label: "Behance", url: item.behanceLink }] : []),
    ...("canvaLink" in item && item.canvaLink ? [{ label: "Canva", url: item.canvaLink }] : []),
    ...("figmaLink" in item && item.figmaLink ? [{ label: "Figma", url: item.figmaLink }] : []),
    ...("githubLink" in item && item.githubLink ? [{ label: "GitHub repository", url: item.githubLink }] : []),
    ...("demoLink" in item && item.demoLink ? [{ label: "Live demo", url: item.demoLink }] : []),
    ...("substackLink" in item && item.substackLink ? [{ label: "Read on Substack", url: item.substackLink }] : []),
    ...("youtubeLink" in item && item.youtubeLink ? [{ label: "YouTube", url: item.youtubeLink }] : []),
    ...("instagramLink" in item && item.instagramLink ? [{ label: "Instagram", url: item.instagramLink }] : []),
    ...("externalLink" in item && item.externalLink ? [{ label: "Open project", url: item.externalLink }] : []),
  ];

  return <main className="min-h-screen bg-black text-[#f8f7f2]">
    <header className="fixed z-20 inset-x-0 top-0 px-[6vw] py-5 bg-black/75 backdrop-blur-xl border-b border-white/10"><a href="/" className="tracking-[.22em] font-semibold">EZER</a></header>
    <article className="pt-32 pb-20 px-[6vw] md:px-[12vw] max-w-7xl mx-auto">
      <a href="/" className="outline-button mb-10"><ArrowLeft size={14}/> Back to portfolio</a>
      <p className="mono gold">{item.category.replace("-", " ")}</p>
      <h1 className="display text-5xl md:text-8xl leading-[.98] mt-5">{item.title}</h1>
      {item.date && <p className="mono muted mt-5">{item.date}</p>}
      {item.coverImage && <div className="mt-10"><img src={item.coverImage} alt={item.title} className="w-full max-h-[72vh] object-cover"/></div>}
      <p className="text-xl md:text-2xl leading-8 max-w-4xl mt-10">{item.description}</p>
      {"role" in item && item.role && <Detail label="Role" value={item.role}/>}
      {"tools" in item && item.tools?.length ? <Detail label="Tools used" value={item.tools.join(" · ")}/> : null}
      {"techStack" in item && item.techStack.length ? <Detail label="Technology stack" value={item.techStack.join(" · ")}/> : null}
      {"subcategory" in item && <Detail label="Collection" value={item.subcategory}/>}
      {"excerpt" in item && <Detail label="Excerpt" value={item.excerpt}/>}
      {"readTime" in item && item.readTime && <Detail label="Read time" value={item.readTime}/>}
      {"performanceDescription" in item && <Detail label="Performance" value={item.performanceDescription}/>}
      {"videoUrl" in item && item.videoUrl && <section className="mt-10"><h2 className="mono gold mb-4">WATCH THE PERFORMANCE</h2><video className="w-full rounded-sm bg-black border border-white/10" controls preload="metadata" playsInline><source src={item.videoUrl} type="video/mp4"/>Your browser does not support the video player.</video></section>}
      {"testimonial" in item && item.testimonial && <Detail label="Testimonial" value={item.testimonial}/>}
      {"body" in item && item.body && <div className="prose prose-invert mt-10 max-w-3xl whitespace-pre-wrap leading-8">{item.body}</div>}
      {item.gallery?.length ? <section className="mt-14"><h2 className="display text-3xl mb-6">Gallery</h2><div className="grid sm:grid-cols-2 gap-4">{item.gallery.map((image,index)=><img key={image+index} src={image} alt={item.title+" gallery "+(index+1)} className="w-full object-cover"/>)}</div></section> : null}
      {"photoGallery" in item && item.photoGallery?.length ? <section className="mt-14"><h2 className="display text-3xl mb-6">Event photos</h2><div className="grid sm:grid-cols-2 gap-4">{item.photoGallery.map((image,index)=><img key={image+index} src={image} alt={item.title+" photo "+(index+1)} className="w-full object-cover"/>)}</div></section> : null}
      {"videoGallery" in item && item.videoGallery?.length ? <Detail label="Video gallery" value={item.videoGallery.join(" · ")}/> : null}
      {links.length > 0 && <section className="mt-14 border-t border-white/15 pt-8"><h2 className="mono gold mb-5">RELATED LINKS</h2><div className="flex flex-wrap gap-3">{links.map((link)=><a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="outline-button">{link.label}<ArrowUpRight size={14}/></a>)}</div></section>}
    </article>
  </main>;
}

function Detail({label,value}:{label:string;value:string}) {
  return <div className="mt-8 border-t border-white/15 pt-4 max-w-4xl"><p className="mono gold mb-3">{label}</p><p className="muted leading-7">{value}</p></div>;
}
