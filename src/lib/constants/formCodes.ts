// Progress Note - Contact Type codes (exact from paper form legend)
export const CONTACT_TYPES = [
  { code: "F-F", label: "Face-to-Face" },
  { code: "TEL", label: "Telephone" },
  { code: "TH", label: "Telehealth" },
  { code: "COM", label: "In Community" },
] as const;

// Progress Note - Service Type codes (exact from paper form legend)
export const SERVICE_TYPES = [
  { code: "AS", label: "Assessment" },
  { code: "CM", label: "Case Mngt" },
  { code: "TP", label: "Tx Planning" },
  { code: "DC", label: "Discharge" },
  { code: "CR", label: "Crisis" },
  { code: "IND", label: "Ind. Counseling" },
  { code: "PC", label: "Physician Consultation" },
  { code: "O", label: "Other" },
] as const;