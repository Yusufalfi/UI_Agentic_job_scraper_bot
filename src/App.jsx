
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import JobTargetForm from "./components/JobTargetForm";
import CVScanner from "./components/CVScanner";
import AgentLog from "./components/AgentLog";

function App() {
  const [status, setStatus] = useState("idle");
  const [scanResult, setScanResult] = useState(null);

  return (
    <main className="page">
      <Navbar />
      <Hero />

      <section className="workspace">
        {/* Kiri: input target role dan upload CV */}
        <JobTargetForm
          onStatusChange={setStatus}
          onResult={setScanResult}
        />

        {/* Kanan: visual scanner dan SATU terminal log */}
        <div className="card visual-card">
          <div className="card-header">
            <div>
              <span className="card-number">02</span>
              <h2>CV ANALYZER</h2>
            </div>

            <span
              className={`label ${
                status === "scanning" ? "live" : ""
              }`}
            >
              {status === "scanning"
                ? "LIVE"
                : status === "success"
                  ? "SUCCESS"
                  : status === "error"
                    ? "ERROR"
                    : "AGENT"}
            </span>
          </div>

          <CVScanner
            scanning={status === "scanning"}
            scanned={status === "success"}
          />

          <AgentLog
            status={status}
            result={scanResult}
          />
        </div>
      </section>

      <footer>
        <span>BUILT FOR JOB SEEKERS × AGENTIC AI</span>
        <span>01 / 01</span>
      </footer>
    </main>
  );
}

export default App;
