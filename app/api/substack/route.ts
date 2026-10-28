import { NextResponse } from "next/server";

function decode(value: string) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
}
function tag(xml: string, name: string) {
  const match = xml.match(new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)<\\/" + name + ">", "i"));
  return match ? decode(match[1].trim()) : "";
}

export async function GET() {
  const feedUrl = process.env.SUBSTACK_FEED_URL || "https://substack.com/@jaymiddy/feed";
  try {
    const response = await fetch(feedUrl, { next: { revalidate: 1800 }, headers: { "User-Agent": "EZER-Portfolio/1.0" } });
    if (!response.ok) return NextResponse.json({ articles: [], source: "unavailable" });
    const xml = await response.text();
    const articles = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 8).map(([_, item]) => {
      const title = tag(item, "title");
      const url = tag(item, "link");
      const description = tag(item, "description").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").slice(0, 260);
      const date = tag(item, "pubDate");
      const slug = url.split("/").filter(Boolean).pop()?.split("?")[0] || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { slug, title, description, url, date };
    }).filter((item) => item.title && item.url);
    return NextResponse.json({ articles, source: feedUrl }, { headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" } });
  } catch {
    return NextResponse.json({ articles: [], source: "unavailable" });
  }
}
