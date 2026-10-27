
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  FileText,
  ScanLine,
  Upload,
  X,
} from "lucide-react";

import { API_BASE_URL } from "../constants/config";
import { validateCVFile } from "../utils/fileValidation";
import TelegramButton from "./TelegramButton";

function JobTargetForm({
  onStatusChange = () => {},
  onResult = () => {},
}) {
  const inputRef = useRef(null);

  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [result, setResult] = useState(null);

  const chooseFile = (picked) => {
    if (!picked) return;

    const validationError = validateCVFile(picked);

    if (validationError) {
      setFile(null);
      setFileError(validationError);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    setFile(picked);
    setFileError("");
    setError("");
    setResult(null);
    onResult(null);
  };

  const removeFile = (event) => {
    event.stopPropagation();

    setFile(null);
    setFileError("");
    setResult(null);
    onResult(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Kirim CV dan target role ke FastAPI.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setResult(null);
    onResult(null);

    if (!role.trim()) {
      setError("Masukkan target role dulu.");
      return;
    }

    if (!file) {
      setError("Upload CV terlebih dahulu.");
      return;
    }

    const formData = new FormData();

    // Nama field harus sesuai dengan backend.
    formData.append("file", file);
    formData.append("target_role", role.trim());

    console.log("Payload yang dikirim:");

    for (const [key, value] of formData.entries()) {
      console.log(
        key,
        value instanceof File
          ? `${value.name} (${value.size} bytes)`
          : value
      );
    }

    setScanning(true);
    onStatusChange("scanning");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/register-cv`,
        {
          method: "POST",
          body: formData,
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "API mengirim response yang tidak valid."
        );
      }

      console.log("API response:", data);

      if (!response.ok || data?.success !== true) {
        const detail = Array.isArray(data?.detail)
          ? data.detail
              .map((item) => {
                const field = item.loc?.at(-1);
                return `${field ?? "Field"}: ${item.msg}`;
              })
              .join("; ")
          : data?.detail || data?.message;

        throw new Error(
          typeof detail === "string"
            ? detail
            : "Gagal memproses CV."
        );
      }

      setResult(data);
      onResult(data);
      onStatusChange("success");
    } catch (err) {
      console.error("Submit error:", err);

      setError(
        err.message ||
          "Terjadi kesalahan saat menghubungi API."
      );

      onResult(null);
      onStatusChange("error");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="card input-card">
      <div className="card-header">
        <div>
          <span className="card-number">01</span>
          <h2>YOUR TARGET</h2>
        </div>

        <span className="label">INPUT</span>
      </div>

      <form onSubmit={handleSubmit}>
        <label
          className="field-label"
          htmlFor="target-role"
        >
          TARGET ROLE
        </label>

        <div className="input-wrap">
          <input
            id="target-role"
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
            placeholder="e.g. AI Automation, Web Developer..."
            disabled={scanning}
          />

          <span>⌘</span>
        </div>

        <label
          className="field-label file-label"
          htmlFor="cv-upload"
        >
          YOUR CV
        </label>

        <button
          type="button"
          className={`dropzone ${
            file ? "has-file" : ""
          }`}
          onClick={() => inputRef.current?.click()}
          disabled={scanning}
        >
          <input
            id="cv-upload"
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={(event) =>
              chooseFile(event.target.files?.[0])
            }
          />

          <div className="upload-icon">
            {file ? (
              <FileText size={23} />
            ) : (
              <Upload size={23} />
            )}
          </div>

          <div className="file-copy">
            <strong>
              {file
                ? file.name
                : "DROP YOUR CV HERE"}
            </strong>

            <small>
              {file
                ? `${(
                    file.size /
                    1024 /
                    1024
                  ).toFixed(2)} MB · Ready`
                : "PDF, DOC, DOCX · MAX 5 MB"}
            </small>
          </div>

          {file && (
            <span
              className="remove"
              onClick={removeFile}
              role="button"
              aria-label="Remove CV"
            >
              <X size={18} />
            </span>
          )}
        </button>

        {fileError && (
          <div className="error">{fileError}</div>
        )}

        {error && (
          <div className="error">{error}</div>
        )}

        <button
          type="submit"
          className="scan-btn"
          disabled={scanning}
        >
          <ScanLine size={21} />
          {scanning ? "SCANNING..." : "SCAN MY CV"}
          <ArrowUpRight size={21} />
        </button>
      </form>

      <p className="privacy">
        <span>●</span> Your CV stays private. Max upload
        size: 5 MB.
      </p>

      {/* Telegram tetap di card input, hasil scan ada di kanan. */}
      {result?.telegram_link && (
        <TelegramButton url={result.telegram_link} />
      )}
    </div>
  );
}

export default JobTargetForm;
