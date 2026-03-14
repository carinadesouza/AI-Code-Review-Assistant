import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-foreground/8 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">     
          <p className="text-xs text-foreground/30 text-center">
            Developed by Carina De Souza
          </p>
        </div>
      </div>
    </footer>
  );
}
