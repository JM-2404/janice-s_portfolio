"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Menu, X, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { photography } from "@/data/photography";
import { designProjects } from "@/data/design";
import { writing } from "@/data/writing";
import { spokenWord } from "@/data/spokenword";
import { events } from "@/data/events";
import { techProjects } from "@/data/projects";
import type { BaseWorkItem } from "@/data/types";

const navigation = [
  ["Work", "#work"], ["Photography", "#photography"], ["Design", "#design"],
  ["Technology", "#technology"], ["Writing", "#writing"], ["Spoken Word", "#spoken-word"],
  ["About", "#about"], ["Contact", "#contact"],
] as const;

function SectionHeading({ number, label, title, description }: { number: string; label: string; title: ReactNode; description?: string }) {
  return <div className="mb-12 md:mb-16">
    <div className="flex items-center justify-between gap-4"><span className="eyebrow mono">{label}</span><span className="mono muted">{number} / 07</span></div>
    <h2 className="section-heading">{title}</h2>
    {description && <p className="muted mt-6 max-w-2xl leading-7">{description}</p>}
  </div>;
}

function WorkCard({ item, kind }: { item: BaseWorkItem; kind: string }) {
  return <a href={`/work/${item.slug}`} className="project-card group block overflow-hidden rounded-sm">
    {item.coverImage ? <div className="aspect-[4/3] overflow-hidden bg-[#101010]"><img src={item.coverImage} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" /></div> : null}
    <div className="p-5 md:p-6">
      <div className="flex items-center justify-between gap-3"><span className="mono gold">{kind}</span><ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
      <h3 className="display mt-4 text-2xl tracking-tight">{item.title}</h3>
      <p className="muted mt-3 text-sm leading-6">{item.description}</p>
      {item.date && <p className="mono muted mt-5">{item.date}</p>}
    </div>
  </a>;
}

function EmptySection({ children, href, label }: { children: ReactNode; href?: string; label?: string }) {
  return <div className="border-y border-current/15 py-9 md:py-12">
    <p className="muted max-w-2xl leading-7">{children}</p>
    {href && label && <a className="outline-button mt-6" href={href} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={14}/></a>}
  </div>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [identityIndex, setIdentityIndex] = useState(0);
  const [photoFilter, setPhotoFilter] = useState("Portraits");
  const [photoPreviewSlug, setPhotoPreviewSlug] = useState(photography[0]?.slug ?? "");
  const [substackArticles, setSubstackArticles] = useState<{slug:string;title:string;description:string;url:string;date?:string}[]>([]);
  const [substackState, setSubstackState] = useState<"loading"|"ready"|"empty">("loading");
  const [contactStatus, setContactStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");

  useEffect(() => {
    const timer = window.setInterval(() => setIdentityIndex((current) => (current + 1) % profile.rotatingIdentities.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/substack").then((response) => response.ok ? response.json() : Promise.reject()).then((data) => {
      if (!active) return;
      const articles = Array.isArray(data.articles) ? data.articles : [];
      setSubstackArticles(articles);
      setSubstackState(articles.length ? "ready" : "empty");
    }).catch(() => { if (active) setSubstackState("empty"); });
    return () => { active = false; };
  }, []);

  const categoryItems = photography.filter((item) => item.subcategory === photoFilter);
  const previewPhoto = photography.find((item) => item.slug === photoPreviewSlug) ?? categoryItems[0] ?? photography[0];

  return <main className="site-wrap">
    <header className="fixed z-50 top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-[1320px] px-4 md:px-6 py-3 flex items-center justify-between gap-4 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 shadow-2xl">
      <a href="#top" aria-label="EZER home" className="leading-tight shrink-0 flex items-center gap-3"><Image src={profile.aboutImage} alt="Middy profile" width={38} height={38} className="rounded-full object-cover border border-white/20" /><span className="block text-lg tracking-[.22em] font-semibold">EZER</span></a>
      <nav className="nav-links flex items-center gap-4">{navigation.map(([label,href])=><a className="nav-link" href={href} key={href}>{label}</a>)}</nav>
      <div className="flex items-center gap-4"><a className="outline-button !py-2.5 !px-4 hidden lg:inline-flex" href="#contact">Let’s talk <ArrowUpRight size={13}/></a><button aria-label={menuOpen ? "Close menu" : "Open menu"} className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21}/> : <Menu size={21}/>}</button></div>
    </header>
    {menuOpen && <div className="fixed z-40 inset-0 bg-black pt-28 px-8"><nav className="flex flex-col gap-5">{navigation.map(([label,href],index)=><a key={href} onClick={()=>setMenuOpen(false)} className="display text-3xl" href={href}><span className="mono gold mr-3">0{index+1}</span>{label}</a>)}</nav></div>}

    <section id="top" className="relative min-h-[100svh] flex flex-col justify-end px-[6vw] md:px-[7.2vw] pt-36 pb-9 hero-grid bg-black overflow-hidden"><Image src={profile.heroImage} alt="Portrait of Middy" fill priority sizes="100vw" className="hero-background object-cover" />
      <div className="grain"/><div className="star-field" aria-hidden="true"/>
      <div className="absolute right-[11%] top-[22%] w-[25vw] max-w-[340px] min-w-[180px] aspect-square rounded-full border border-[#c6a86b]/30 hero-orb"/><div className="absolute right-[15%] top-[26%] w-[17vw] max-w-[230px] min-w-[125px] aspect-square rounded-full border border-[#c6a86b]/20 hero-orb"/>
      <div className="relative z-10 max-w-[1250px] w-full mx-auto">
        <div className="mono gold mb-7 flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#c6a86b] animate-pulse"/> GHANA · OPEN TO THE WORLD</div>
        <div className="hero-name-row mt-5"><h1 className="display hero-word hero-name">Middy</h1><span className="hero-is-a mono gold">is a</span></div><div className="hero-identity-wrap mt-2" aria-live="polite"><p key={profile.rotatingIdentities[identityIndex]} className="display hero-identity">{profile.rotatingIdentities[identityIndex]}</p></div>
        <p className="mono muted mt-5 mb-2">ALSO KNOWN AS</p><h2 className="text-sm md:text-base tracking-[.08em] text-white/85">{profile.name} (EZER)</h2>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-9 mt-9 md:mt-12"><div className="max-w-xl"><p className="gold mono mt-4">PASSION. INNOVATION. IMPACT.</p><p className="text-xl md:text-2xl leading-relaxed mt-4">{profile.tagline}</p><p className="muted mt-4 leading-7 max-w-md">{profile.intro}</p></div><div className="flex flex-wrap gap-3"><a href="#work" className="outline-button w-fit">See the work <ArrowDownRight size={15}/></a><a href="#contact" className="outline-button w-fit">Let’s talk <ArrowUpRight size={15}/></a></div></div>
      </div>
      <div className="relative z-10 flex justify-between items-center mt-16 pt-5 border-t border-white/15 mono muted"><span>EZER / PORTFOLIO</span><span className="hidden sm:block">IDEAS MADE HUMAN</span><a href="#about" className="gold">SCROLL TO DISCOVER ↓</a></div>
    </section>

    <div className="border-y border-white/10 py-4 overflow-hidden bg-black"><div className="marquee mono flex gap-8 w-max text-[#c6a86b]">{Array.from({length:4},(_,i)=><span key={i} className="flex items-center gap-8">PASSION <b>✳</b> INNOVATION <b>✳</b> IMPACT <b>✳</b> FAITH <b>✳</b> CREATIVITY <b>✳</b> HUMAN CONNECTION <b>✳</b></span>)}</div></div>

    <section id="about" className="section bg-[#f8f7f2] text-[#151515]"><SectionHeading number="01" label="THE PERSON BEHIND EZER" title={<>Passion is the start.<br/><span className="serif gold">Impact is the intention.</span></>} description="A creative life guided by faith, curiosity, and the belief that what we make should mean something."/><div className="grid md:grid-cols-[.7fr_1.3fr] gap-12 md:gap-24"><div><div className="relative aspect-[3/4] overflow-hidden bg-black/5 mb-8"><Image src={profile.aboutImage} alt={`Portrait of ${profile.name}`} fill sizes="(max-width:768px) 90vw, 35vw" className="object-cover" /></div><p className="serif text-5xl md:text-7xl leading-tight">“I am the Potter’s piece.”</p><p className="mono mt-6 text-[#6e675b]">A PERSONAL PHILOSOPHY</p></div><div className="max-w-3xl">{profile.about.map((paragraph,index)=><p key={index} className="text-lg md:text-xl leading-8 mt-0 mb-6 text-[#3f3c37]">{paragraph}</p>)}<div className="mt-8 flex flex-wrap gap-2">{profile.disciplines.map((label)=><span key={label} className="border border-black/20 rounded-full px-4 py-2 text-xs">{label}</span>)}</div><div className="mt-8 grid sm:grid-cols-2 gap-6 border-t border-black/15 pt-5"><div><p className="mono text-[#6e675b] mb-2">BASED IN</p><p className="text-sm font-medium">{profile.base}</p></div><div><p className="mono text-[#6e675b] mb-2">AVAILABLE FOR</p><p className="text-sm leading-6">{profile.availableFor.join(" · ")}</p></div></div></div></div></section>

    <section id="work" className="section bg-black"><SectionHeading number="01" label="SELECTED WORK" title={<>A life in<br/><span className="serif gold">many mediums.</span></>} description="Explore the different ways I turn ideas, stories and curiosity into work."/><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">{[{label:"Photography",href:"#photography"},{label:"Design",href:"#design"},{label:"Technology",href:"#technology"},{label:"Writing",href:"#writing"},{label:"Spoken Word",href:"#spoken-word"},{label:"Public Speaking",href:"#hosting"}].map((item)=><a key={item.label} href={item.href} className="project-card p-6 md:p-8 flex items-center justify-between group"><span className="display text-2xl">{item.label}</span><ArrowUpRight size={18} className="gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"/></a>)}</div></section>

    <section id="photography" className="section bg-black"><SectionHeading number="02" label={profile.photographyBrand} title={<>A moment, kept<br/><span className="serif gold">with intention.</span></>} description="Selected portraits, events and visual experiments from behind the lens."/>
      <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-10 lg:gap-16 items-start">
        <div className="flex flex-col border-t border-white/15">
          {["Portraits","Events","Nature","Creative Concepts"].map((category,index)=>{
            const items=photography.filter((item)=>item.subcategory===category);
            const active=photoFilter===category;
            return <button key={category} type="button" onMouseEnter={()=>{setPhotoFilter(category);if(items[0])setPhotoPreviewSlug(items[0].slug)}} onFocus={()=>{setPhotoFilter(category);if(items[0])setPhotoPreviewSlug(items[0].slug)}} onClick={()=>{setPhotoFilter(category);if(items[0])setPhotoPreviewSlug(items[0].slug)}} className={`group flex items-center justify-between gap-4 py-5 text-left border-b border-white/15 transition-colors ${active?"text-[#c6a86b]":"text-white/80 hover:text-[#c6a86b]"}`}>
              <span><span className="mono muted mr-4">0{index+1}</span><span className="display text-2xl md:text-3xl">{category}</span></span><ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"/>
            </button>;
          })}
          <a href={profile.links.vsco} target="_blank" rel="noreferrer" className="outline-button mt-7 w-fit">Explore the full VSCO archive <ArrowUpRight size={14}/></a>
        </div>
        <div className="min-w-0">
          {previewPhoto ? <a href={previewPhoto.galleryLink} target="_blank" rel="noreferrer" className="group block relative overflow-hidden bg-[#101010]">
            <div className="aspect-[4/3] overflow-hidden"><img key={previewPhoto.coverImage} src={previewPhoto.coverImage} alt={previewPhoto.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.035]" loading="lazy"/></div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex items-end justify-between gap-4">
              <div><p className="mono gold mb-2">{previewPhoto.subcategory}</p><h3 className="display text-3xl md:text-5xl">{previewPhoto.title}</h3></div><ArrowUpRight size={20}/>
            </div>
          </a> : <div className="aspect-[4/3] bg-white/5 flex flex-col justify-end p-6"><p className="mono gold">Selected collections</p><p className="display text-3xl mt-3">Photographs coming into focus.</p></div>}
          <p className="muted text-sm leading-6 mt-4">{previewPhoto?.description ?? "Explore selected photographs through the VSCO archive."}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3"><a href={profile.links.pixieset} target="_blank" rel="noreferrer" className="outline-button">View Full Gallery on Pixieset <ArrowUpRight size={14}/></a><a href={profile.links.vsco} target="_blank" rel="noreferrer" className="outline-button">View on VSCO <ArrowUpRight size={14}/></a></div>
    </section>

    <section id="design" className="section bg-[#f8f7f2] text-[#151515]"><SectionHeading number="03" label="DESIGN & ART DIRECTION" title={<>Make it mean<br/><span className="serif gold">something.</span></>} description="Case studies that document the brief, the decisions, the tools and the final result."/>
      {designProjects.length ? <div className="grid md:grid-cols-2 gap-5">{designProjects.map((item)=><WorkCard key={item.slug} item={item} kind="Design case study"/>)}</div> : <EmptySection href={profile.links.behance} label="Explore Behance">New design stories are being prepared for this space. In the meantime, explore selected work on Behance.</EmptySection>}
      <a href={profile.links.behance} target="_blank" rel="noreferrer" className="outline-button mt-8">Find me on Behance <ArrowUpRight size={14}/></a>
    </section>

    <section id="technology" className="section bg-[#0a0a0a]"><SectionHeading number="04" label="CREATIVE TECHNOLOGY" title={<>Build with curiosity.<br/><span className="serif gold">Solve with purpose.</span></>} description="Software, experiments and digital experiences where ideas become useful things."/>
      {techProjects.length ? <div className="divide-y divide-white/15 border-y border-white/15">{techProjects.map((item,index)=><article key={item.slug} className="grid md:grid-cols-[.25fr_1fr_.65fr] gap-5 md:gap-10 py-8 md:py-10">
        <p className="mono gold">PROJECT 0{index+1}</p>
        <div><h3 className="display text-3xl md:text-4xl">{item.title}</h3><p className="muted mt-4 leading-7 max-w-2xl">{item.description}</p>{item.role&&<p className="mono muted mt-4">ROLE · {item.role}</p>}</div>
        <div className="flex flex-col items-start gap-4"><div className="flex flex-wrap gap-2">{item.techStack.map((tech)=><span key={tech} className="border border-white/20 px-3 py-2 rounded-full text-xs">{tech}</span>)}</div><div className="flex flex-wrap gap-3 mt-2"><a href={item.githubLink} target="_blank" rel="noreferrer" className="outline-button">GitHub <ArrowUpRight size={14}/></a>{item.demoLink&&<a href={item.demoLink} target="_blank" rel="noreferrer" className="outline-button">Live demo <ArrowUpRight size={14}/></a>}</div></div>
      </article>)}</div> : <EmptySection href={profile.links.github} label="Explore GitHub">Explore current code and experiments on GitHub. Featured project case studies will appear here as verified project details are added.</EmptySection>}
      <a href={profile.links.github} target="_blank" rel="noreferrer" className="outline-button mt-8">Explore GitHub <ArrowUpRight size={14}/></a>
    </section>

    <section id="writing" className="section bg-[#f8f7f2] text-[#151515]"><SectionHeading number="05" label={profile.writingBrand} title={<>Words for the<br/><span className="serif gold">in-between.</span></>} description="Reflections, stories, observations and ideas on faith, creativity, purpose, personal growth, technology and impact."/>
      {writing.length || substackArticles.length ? <div className="grid md:grid-cols-2 gap-5">{[...writing.map((item)=>({slug:item.slug,title:item.title,description:item.excerpt,category:item.category,date:item.publishedAt||item.date,coverImage:item.coverImage,readTime:item.readTime,externalLink:item.externalLink})),...substackArticles.map((item)=>({slug:item.slug,title:item.title,description:item.description,category:"Substack",date:item.date,coverImage:"/images/profile/middy.jpeg",readTime:undefined,externalLink:item.url}))].map((item,index)=>{const externalLink = item.externalLink; return <a key={item.slug+index} href={externalLink||`/work/${item.slug}`} target={externalLink?"_blank":undefined} rel={externalLink?"noreferrer":undefined} className="project-card group block overflow-hidden"><div className="grid grid-cols-1">{item.coverImage && <div className="aspect-[16/9] overflow-hidden"><img src={item.coverImage} alt={item.title} loading="lazy" className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"/></div>}<div className="p-6 md:p-8"><div className="mono gold">{item.category} {item.date ? `· ${item.date}` : ""}</div><h3 className="display text-2xl md:text-3xl mt-5">{item.title}</h3><p className="muted mt-4 leading-7 whitespace-pre-line">{item.description}</p>{item.readTime && <p className="mono muted mt-4">{item.readTime} read</p>}<span className="mono mt-7 inline-flex items-center gap-2">Read more <ArrowUpRight size={14}/></span></div></div></a>})}</div> : <EmptySection href={profile.links.substack} label="Read on Substack">{substackState==="loading"?"Finding the latest Potter’s Piece stories…":"Explore essays and reflections on Potter’s Piece, the Substack publication."}</EmptySection>}
      <a href={profile.links.substack} target="_blank" rel="noreferrer" className="outline-button mt-8">Visit Potter’s Piece on Substack <ArrowUpRight size={14}/></a>
    </section>

    <section id="spoken-word" className="section bg-[#151515]"><SectionHeading number="06" label={profile.spokenWordBrand} title={<>Words crafted to<br/><span className="serif gold">move something.</span></>} description={profile.spokenWordSubtitle}/>
      {spokenWord.length ? <div className="grid gap-8">{spokenWord.map((item,index)=><article key={item.slug} className="relative isolate overflow-hidden min-h-[420px] md:min-h-[500px] flex items-end bg-[#0b0b0e] border border-white/10">
        {item.coverImage&&<img src={item.coverImage} alt="" aria-hidden="true" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-50"/>}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/65 to-black/20"/>
        <div className="grain"/>
        <div className="relative z-10 max-w-4xl p-7 md:p-12 lg:p-16"><p className="mono gold mb-5">SPOKEN WORD / 0{index+1}</p><blockquote className="serif text-3xl md:text-5xl lg:text-6xl leading-[1.12] text-white max-w-4xl">“{item.excerpt}”</blockquote><h3 className="display text-3xl md:text-4xl mt-7">{item.title}</h3><p className="muted mt-3 max-w-2xl leading-7">{item.description}</p><div className="flex flex-wrap gap-3 mt-7"><a href={`/work/${item.slug}`} className="outline-button">Explore the piece <ArrowUpRight size={14}/></a>{item.performanceLink&&<a href={item.performanceLink} target="_blank" rel="noreferrer" className="outline-button">Performance link <ArrowUpRight size={14}/></a>}{item.videoUrl&&<a href={item.videoUrl} target="_blank" rel="noreferrer" className="outline-button">Watch video <ArrowUpRight size={14}/></a>}{item.youtubeLink&&<a href={item.youtubeLink} target="_blank" rel="noreferrer" className="outline-button">YouTube <ArrowUpRight size={14}/></a>}{item.instagramLink&&<a href={item.instagramLink} target="_blank" rel="noreferrer" className="outline-button">Instagram <ArrowUpRight size={14}/></a>}</div>
      </div></article>)}</div> : <EmptySection>Explore the spoken-word collection soon.</EmptySection>}
    </section>

    <section id="hosting" className="section bg-[#f8f7f2] text-[#151515]"><SectionHeading number="07" label="MC · HOSTING · PUBLIC SPEAKING" title={<>Hold the room.<br/><span className="serif gold">Connect the people.</span></>} description="Hosting and speaking experiences built around warmth, clarity, energy and a sense of shared purpose."/>
      {events.length ? <div className="grid md:grid-cols-2 gap-5">{events.map((item)=><WorkCard key={item.slug} item={item} kind={item.role}/>)}</div> : <EmptySection>New hosting and public-speaking highlights are being prepared. Check back soon for event stories and moments from the room.</EmptySection>}
    </section>

    <section id="contact" className="section bg-[#f7f4ed] text-[#151515]">
      <div className="grid md:grid-cols-[1fr_.8fr] gap-12 md:gap-24">
        <div>
          <span className="eyebrow mono">THE NEXT CHAPTER</span>
          <h2 className="section-heading mt-7">Let’s Create<br/><span className="serif gold">Impact Together</span></h2>
          <p className="max-w-lg mt-7 leading-7 text-[#55514a]">Whether you're looking for a designer, photographer, writer, creative technologist, speaker, MC, or collaborator, I'd love to hear about your idea.</p>
          <a className="inline-block mt-6 border-b border-black/25 pb-2 text-sm" href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
          <div className="mt-8 border border-black/15 p-5 md:p-7 rounded-lg">
            <form onSubmit={async (event)=>{event.preventDefault();setContactStatus("sending");const form=event.currentTarget;try{const response=await fetch("https://formspree.io/f/mdeegkan",{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});if(!response.ok)throw new Error("Formspree is not configured yet");setContactStatus("sent");form.reset()}catch{setContactStatus("error")}}} className="grid gap-4">
              <label className="text-sm" htmlFor="contact-name">Your Name</label>
              <input id="contact-name" name="name" required placeholder="Your Name" className="input-field !text-[#151515] !border-black/20" />
              <label className="text-sm" htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" required placeholder="you@example.com" className="input-field !text-[#151515] !border-black/20" />
              <label className="text-sm" htmlFor="contact-service">Service Required</label>
              <select id="contact-service" name="service" required defaultValue="" className="input-field !text-[#151515] !border-black/20">
                <option value="" disabled>Choose a Service</option>
                <option>Photography</option><option>Graphic Design</option><option>Brand Identity</option><option>Creative Direction</option><option>Content Creation</option><option>Creative Technology</option><option>Technology Project</option><option>Website Development</option><option>Spoken Word Performance</option><option>MC / Event Hosting</option><option>Writing Collaboration</option><option>Mentorship &amp; Collaboration</option><option>Other</option>
              </select>
              <label className="text-sm" htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" required placeholder="Tell me about your project, event, collaboration or idea." rows={4} className="input-field !text-[#151515] !border-black/20" />
              <button disabled={contactStatus==="sending"} className="outline-button justify-center !border-black/25">{contactStatus==="sending"?"Sending…":"SEND MESSAGE →"} <Send size={14}/></button>
              {contactStatus==="sent"&&<p className="text-sm text-green-800">Message sent. Thank you for reaching out.</p>}
              {contactStatus==="error"&&<p className="text-sm text-amber-800">Your message could not be sent just now. Please try again or email me directly at {profile.links.email}.</p>}
            </form>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 content-start">
          {Object.entries({Email:`mailto:${profile.links.email}`,LinkedIn:profile.links.linkedin,GitHub:profile.links.github,Behance:profile.links.behance,Instagram:profile.links.instagram,Substack:profile.links.substack,VSCO:profile.links.vsco,Pixieset:profile.links.pixieset}).map(([label,url])=><a key={label} href={url} target={url.startsWith("mailto:")?undefined:"_blank"} rel="noreferrer" className="group border-b border-black/15 pb-4"><span className="mono text-[#746e63] block mb-3">{label}</span><span className="flex items-center justify-between gap-2 text-sm group-hover:text-[#a3874b]">{label==="Email"?profile.links.email:label==="Pixieset"?"Potter’s Piece Studios":label}<ArrowUpRight size={14}/></span></a>)}
        </div>
      </div>
      <footer className="mt-20 pt-7 border-t border-black/15">
        <p className="display text-3xl md:text-5xl tracking-tight">PASSION. INNOVATION. IMPACT.</p>
        <p className="mono text-[#746e63] mt-5">© EZER 2026</p>
        <p className="text-sm text-[#4f4b44] mt-3">Creative Technologist • Designer • Photographer • Writer • Spoken Word Artist</p>
      </footer>
    </section>
  </main>;
}
