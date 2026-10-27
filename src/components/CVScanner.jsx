import { Check } from "lucide-react";

function CVScanner({ scanning, scanned }) {
  return (
    <div
      className={`scan-stage ${scanning ? "is-scanning" : ""} ${
        scanned ? "is-done" : ""
      }`}
    >
      <div className="scan-grid" />

      <div className="scan-corner tl" />
      <div className="scan-corner tr" />
      <div className="scan-corner bl" />
      <div className="scan-corner br" />

      <div className="document">
        <div className="doc-top">
          <div className="avatar-block" />
          <div className="doc-lines">
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="doc-section">
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="doc-section short">
          <i />
          <i />
          <i />
        </div>

        <div className="doc-section">
          <i />
          <i />
          <i />
          <i />
        </div>

        {scanning && <div className="scan-beam" />}

        {scanned && (
          <div className="scan-check">
            <Check size={22} strokeWidth={3} />
          </div>
        )}
      </div>

      <div className="scan-status">
        <span className="status-dot" />
        {scanning
          ? "ANALYZING CV..."
          : scanned
            ? "CV SCANNED"
            : "READY TO SCAN"}
      </div>
    </div>
  );
}

export default CVScanner;