import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="text-[clamp(5rem,20vw,11rem)] font-semibold leading-none tracking-[-0.06em] text-fade">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">Sahifa topilmadi</h1>
      <p className="mt-3 max-w-md text-smoke">Siz izlagan sahifa mavjud emas yoki ko&apos;chirilgan.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Bosh sahifa</Button>
        <Button href="/catalog" variant="secondary">
          Katalog
        </Button>
      </div>
    </section>
  );
}
