"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import Header from "@/components/header";
import { useCertifyDocument } from "@/contracts/hooks";
import { createHash } from "crypto"; // To generate image hash

interface OCRResponse {
  ParsedResults: { ParsedText: string }[];
}

interface OllamaResponse {
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

function extractJsonResponse(response: string): OllamaResponse | null {
  try {
    const jsonResponse = JSON.parse(response);
    if (
      jsonResponse.status &&
      jsonResponse.confidence !== undefined &&
      jsonResponse.fraudRisk !== undefined &&
      jsonResponse.legitimacyAssessment &&
      Array.isArray(jsonResponse.findings) &&
      jsonResponse.metadata &&
      typeof jsonResponse.metadata.issuer === "string"
    ) {
      return jsonResponse;
    } else {
      console.error("Invalid response structure");
      return null;
    }
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    return null;
  }
}

const OCR_API_URL = "https://api.ocr.space/parse/image";
const OCR_API_KEY = "K85822575488957";
const OLLAMA_API_URL = "https://jo3m4y06rnnwhaz.askbhunte.com/api/generate";

export default function Certify() {
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [inputType, setInputType] = useState<"url" | "image">("url");
  const [ollamaResponse, setOllamaResponse] = useState<OllamaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const account = useAccount();
  const certifyDocument = useCertifyDocument(); // Get certifyDocument hook

  const handleOCR = async (image: File | string): Promise<string | null> => {
    setMessage("Processing OCR...");
    const formData = new FormData();
    if (typeof image === "string") {
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append("file", blob);
    } else {
      formData.append("file", image);
    }
    formData.append("apikey", OCR_API_KEY);

    try {
      const response = await fetch(OCR_API_URL, {
        method: "POST",
        body: formData,
      });

      const data: OCRResponse = await response.json();
      if (data.ParsedResults?.length) {
        setMessage("OCR extraction completed.");
        return data.ParsedResults[0].ParsedText;
      } else {
        setError("OCR failed to extract text.");
        setMessage("");
        return null;
      }
    } catch (error) {
      setError("Error calling OCR API.");
      setMessage("");
      return null;
    }
  };

  const handleGenerateImageHash = (image: File): string => {
    setMessage("Generating image hash...");
    const reader = new FileReader();
    reader.readAsArrayBuffer(image);
    reader.onload = function () {
      const hash = createHash("sha256");
      hash.update(reader.result as ArrayBuffer);
      const imageHash = hash.digest("hex");
      setIpfsHash(imageHash);
      setMessage("Image hash generated.");
    };
    return "hash-generated";
  };

  const handleOllamaAPI = async (extractedText: string): Promise<void> => {
    setMessage("Analyzing certificate with AI...");
    const requestBody = JSON.stringify({
      model: "llama3.1:latest",
      prompt: `
        Analyze this certificate content for authenticity. Consider:
        - Standard certificate elements like issuer, dates, signatures
        - Suspicious patterns or inconsistencies (unusual fonts, logos, or issuer names)
        - Formatting and language typical of official certificates (alignment, terminology)
        - Extract key metadata (issue date, expiry date, type of certificate)
        - Assess overall legitimacy.

        Certificate content:
        ${extractedText}

        Respond in JSON format as follows:
        Do not respond with anything other than the json
        {
          "status": "authentic | suspicious | invalid",
          "confidence": range[0-100],
          "fraudRisk": range[0-100]),
          "legitimacyAssessment": "summary",
          "findings": ["findings"],
          "metadata": {
            "issuer": "issuer",
            "issuanceDate": "date",
            "expiryDate": "date",
            "certificateType": "type"
          }
        }`,
      stream: false,
    });

    try {
      const response = await fetch(OLLAMA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const rawText = await response.text();
      const data: OllamaResponse = JSON.parse(rawText);

      const parsedResponse = extractJsonResponse(data.response);
      if (parsedResponse) {
        setOllamaResponse(parsedResponse);
        setMessage("AI analysis completed.");
        setError(null);
      } else {
        setError("Error parsing Ollama response.");
        setOllamaResponse(null);
      }
    } catch (error) {
      setError("Error calling Ollama API.");
      setMessage("");
      setOllamaResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Starting process...");

    if (inputType === "url") {
      setMessage("Fetching certificate from URL...");
      const extractedText = await handleOCR(ipfsHash);
      if (extractedText) {
        await handleOllamaAPI(extractedText);
        // Now call certifyDocument after AI analysis
        await certifyDocument.mutateAsync({ ipfsHash,});
      }
    } else if (inputType === "image" && imageUpload) {
      setMessage("Processing uploaded image...");
      handleGenerateImageHash(imageUpload);
      const extractedText = await handleOCR(imageUpload);
      if (extractedText) {
        await handleOllamaAPI(extractedText);
        // Now call certifyDocument after AI analysis
        await certifyDocument.mutateAsync({ ipfsHash,  });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <Header />
      </div>

      <div className="p-8 rounded-lg flex flex-col justify-center w-[80%] mx-auto mt-12">
        <p className="text-xl text-center font-medium text-gray-700">
          Validate certificates using blockchain and AI-powered fraud detection.
        </p>
      </div>

      <div className="flex items-center w-[85%] mx-auto justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-[50%] bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Certify Document</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="urlInput"
                name="inputType"
                value="url"
                checked={inputType === "url"}
                onChange={() => setInputType("url")}
                className="mr-2"
              />
              <label htmlFor="urlInput" className="text-gray-700">Enter Certificate URL</label>

              <input
                type="radio"
                id="imageInput"
                name="inputType"
                value="image"
                checked={inputType === "image"}
                onChange={() => setInputType("image")}
                className="ml-4 mr-2"
              />
              <label htmlFor="imageInput" className="text-gray-700">Upload Certificate Image</label>
            </div>

            {inputType === "url" ? (
              <div>
                <label htmlFor="ipfsHash" className="block text-sm font-medium text-gray-700">Certificate URL</label>
                <input
                  type="text"
                  id="ipfsHash"
                  value={ipfsHash}
                  onChange={(e) => setIpfsHash(e.target.value)}
                  required
                  disabled={loading}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Upload Certificate Image</label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={(e) => setImageUpload(e.target.files ? e.target.files[0] : null)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (inputType === "url" && ipfsHash.trim() === "") || (inputType === "image" && !imageUpload)}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? "Verifying..." : "Certify"}
            </button>
          </form>

          {loading && (
            <div className="mt-6 flex justify-center">
              <span>{message}</span>
            </div>
          )}

          {verificationResult && !ollamaResponse && (
            <div className="mt-8 p-4 rounded-lg bg-green-100 text-green-800">
              <p>Certificate verified successfully!</p>
              <p>Organization Address: {account.address}</p>
              <p>IPFS Hash: {ipfsHash}</p>
              <p>Transaction Hash: {verificationResult}</p>
            </div>
          )}

          {ollamaResponse ? (
            <div className="mt-8 p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">Analysis Summary</h4>
                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-bold ${
                        ollamaResponse.status === "suspicious"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {ollamaResponse.status}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Confidence Score:</strong>{" "}
                    <span className="font-bold">
                      {ollamaResponse.confidence}% 
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Fraud Risk:</strong>{" "}
                    <span className="font-bold">
                      {ollamaResponse.fraudRisk}% 
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">Findings</h4>
                {ollamaResponse?.findings && ollamaResponse.findings.length > 0 ? (
                  <ul className="list-disc pl-5 mt-4">
                    {ollamaResponse?.findings.map((finding, index) => (
                      <li key={index} className="text-gray-700">
                        {finding}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">No findings available.</p>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800">Certificate Metadata</h4>
                <div className="mt-4">
                  <p className="text-gray-700"><strong>Issuer:</strong> {ollamaResponse.metadata.issuer}</p>
                  <p className="text-gray-700"><strong>Issuance Date:</strong> {ollamaResponse.metadata.issuanceDate}</p>
                  <p className="text-gray-700"><strong>Expiry Date:</strong> {ollamaResponse.metadata.expiryDate}</p>
                  <p className="text-gray-700"><strong>Certificate Type:</strong> {ollamaResponse.metadata.certificateType}</p>
                </div>
              </div>
            </div>
          ) : (
            error && (
              <div className="mt-8 p-4 rounded-lg bg-red-100 text-red-800">
                <p>{error}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
