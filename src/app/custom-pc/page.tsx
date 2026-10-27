import type { Metadata } from "next";
import { PCBuilder } from "@/components/pc-builder/PCBuilder";

export const metadata: Metadata = {
  title: "Tayyor Gaming PC-lar — Maxsus Case va Tizimlar | PRO-DUCT",
  description:
    "NVIDIA RTX 5090, RTX 5080, RTX 5070 Ti va RTX 5060 bilan yig'ilgan tayyor premium gaming kompyuter korpuslari va tizimlari. Kafolat va tezkor yetkazib berish.",
  alternates: { canonical: "/custom-pc" },
};

export default function CustomPCPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-24 md:px-10 md:pt-28">
      <PCBuilder />
    </div>
  );
}
