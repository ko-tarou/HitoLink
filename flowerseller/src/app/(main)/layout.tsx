import { BackButton } from "@/components/ui/BackButton";
import { HeaderTitle } from "@/components/ui/HeaderTitle";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-subtle flex flex-col text-text">
      <header className="flex items-center gap-4 px-6 py-4 border-b border-border bg-base shrink-0 text-text">
        <BackButton />
        <HeaderTitle />
      </header>
      <main className="flex-1 overflow-auto text-text">{children}</main>
    </div>
  );
}
