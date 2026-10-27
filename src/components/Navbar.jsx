import { Zap } from "lucide-react";

function Navbar() {
  return (
    <header className="nav">
      <div className="brand">
        <div className="brand-mark">
          <Zap size={19} fill="currentColor" />
        </div>
        <span>AGENTIC JOB SCRAPER</span>
      </div>

      <div className="nav-pill">
        AI-POWERED <span>●</span>
      </div>
    </header>
  );
}

export default Navbar;