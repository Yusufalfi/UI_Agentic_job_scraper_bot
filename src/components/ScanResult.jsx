import { CheckCircle2, Hash, BriefcaseBusiness } from "lucide-react";

function ScanResult({ result }) {
  if (!result) return null;

  return (
    <section className="scan-result" aria-live="polite">
      <div className="result-heading">
        <span><CheckCircle2 size={17} /> SCAN SUCCESSFUL</span>
        {result.unique_code && (
          <strong><Hash size={14} /> {result.unique_code}</strong>
        )}
      </div>

      <p>{result.message || "CV berhasil diproses."}</p>

      {Array.isArray(result.target_roles) && result.target_roles.length > 0 && (
        <div className="result-role-group">
          <div className="result-role-label"><BriefcaseBusiness size={15} /> TARGET ROLES</div>
          <div className="target-roles">
            {result.target_roles.map((targetRole) => (
              <span key={targetRole}>{targetRole}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ScanResult;
