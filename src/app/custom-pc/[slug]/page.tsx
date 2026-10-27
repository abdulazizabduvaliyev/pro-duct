import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { READY_CASES, getReadyCase } from "@/data/ready-cases";
import { site } from "@/lib/site";
import { ReadyCaseDetail } from "@/components/pc-builder/ReadyCaseDetail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return READY_CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const readyCase = getReadyCase(slug);
  if (!readyCase) return {};

  const title = `${readyCase.name} — ${readyCase.buildTitle} | ${site.name}`;
  const description = `${readyCase.tagline} ${readyCase.description}`;

  return {
    title,
    description,
    alternates: { canonical: `/custom-pc/${readyCase.slug}` },
    openGraph: {
      title,
      description,
      url: `/custom-pc/${readyCase.slug}`,
      type: "website",
      images: [{ url: readyCase.image }],
    },
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const readyCase = getReadyCase(slug);
  if (!readyCase) notFound();

  return <ReadyCaseDetail readyCase={readyCase} />;
}

