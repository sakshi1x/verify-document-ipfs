export interface OCRResponse {
  ParsedResults: { ParsedText: string }[];
}

export interface OllamaResponse {
  status: string;
  confidence: number;
  fraudRisk: number;
  legitimacyAssessment: string;
  findings: string[];
  metadata: {
    issuer: string;
    issuanceDate: string;
    expiryDate: string;
    certificateType: string;
  };
}
