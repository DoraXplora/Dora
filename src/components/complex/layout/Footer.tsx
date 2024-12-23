export function Footer() {
  return (
    <footer className="grid place-content-center border-t bg-background">
      <div className="container max-sm:px-5 flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 text-sm text-muted-foreground">
          <span>
            Powered by{' '}
            <a
              className="text-[#9F1B30] hover:text-[#D11F2F] hover:underline"
              href="https://soo.network"
              target="_blank"
            >
              SOON Blockchain
            </a>{' '}
          </span>
          <span className="hidden md:inline">·</span>
          <nav className="flex gap-4">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
            <a href="#" className="hover:underline">
              Advertise
            </a>
            <a href="#" className="hover:underline">
              Knowledge Base
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
