
import { useEffect, useState } from "react";

const LOG_STEPS = [
  "Initializing CV parser",
  "Extracting full name",
  "Extracting address",
  "Extracting phone number",
  "Extracting email address",
  "Extracting work experience",
  "Extracting education history",
  "Extracting technical skills",
  "Analyzing target role",
  "Saving candidate profile",
];

function AgentLog({ status, result }) {
  const [visibleLogs, setVisibleLogs] = useState(0);

  useEffect(() => {
    if (status !== "scanning") {
      setVisibleLogs(0);
      return;
    }

    setVisibleLogs(1);

    const timer = setInterval(() => {
      setVisibleLogs((current) =>
        Math.min(current + 1, LOG_STEPS.length)
      );
    }, 650);

    return () => clearInterval(timer);
  }, [status]);

  return (
    <div className="scan-terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span />
          <span />
          <span />
        </div>

        <span>CV_EXTRACTION.LOG</span>

        <span className="terminal-live">
          {status === "scanning"
            ? "LIVE"
            : status === "success"
              ? "SUCCESS"
              : status === "error"
                ? "ERROR"
                : "STANDBY"}
        </span>
      </div>

      <div className="terminal-body">
        {status === "idle" && (
          <div className="terminal-welcome">
            <span className="terminal-prompt">&gt;</span>
            {" "}Waiting for CV upload...
            <span className="terminal-cursor">_</span>
          </div>
        )}

        {status === "scanning" &&
          LOG_STEPS.slice(0, visibleLogs).map(
            (step, index) => {
              const isLatest =
                index === visibleLogs - 1;

              return (
                <div
                  className="terminal-line"
                  key={step}
                >
                  <span className="terminal-prompt">
                    &gt;
                  </span>

                  <span
                    className={
                      isLatest
                        ? "log-active"
                        : "log-done"
                    }
                  >
                    {step}
                  </span>

                  <span className="terminal-status">
                    {isLatest
                      ? "PROCESSING..."
                      : "RUNNING"}
                  </span>
                </div>
              );
            })}

        {status === "scanning" && (
          <div className="terminal-cursor">_</div>
        )}

        {status === "success" && (
          <>
            <div className="terminal-result">
              &gt; SCAN SUCCESSFUL
            </div>

            <div className="terminal-message">
              {result?.message ||
                "CV successfully parsed and stored!"}
            </div>

            <div className="result-section">
              <div className="result-label">
                UNIQUE CODE
              </div>

              <div className="result-value">
                {result?.unique_code || "—"}
              </div>
            </div>

            <div className="result-section">
              <div className="result-label">
                TARGET ROLES
              </div>

              <div className="result-tags">
                {(result?.target_roles || []).map(
                  (targetRole, index) => (
                    <span
                      className="result-tag"
                      key={`${targetRole}-${index}`}
                    >
                      {targetRole}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="terminal-result">
              &gt; CV processing completed successfully.
            </div>
          </>
        )}

        {status === "error" && (
          <div className="terminal-error">
            &gt; Processing failed. Check the error
            message in the input card.
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentLog;
