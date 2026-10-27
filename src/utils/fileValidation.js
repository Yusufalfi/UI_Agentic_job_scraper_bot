import {
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../constants/config";

export function validateCVFile(file) {
  if (!file) {
    return "Upload CV terlebih dahulu.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File terlalu besar. Maksimal 5 MB.";
  }

  const validType = ALLOWED_FILE_TYPES.includes(file.type);
  const validExtension = ALLOWED_FILE_EXTENSIONS.test(file.name);

  if (!validType && !validExtension) {
    return "Gunakan file PDF, DOC, atau DOCX.";
  }

  return "";
}