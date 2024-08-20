"use client";

import Header from "@/components/header";
import { useCertifyDocument } from "@/contracts/hooks";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Certify() {
  const [ipfsHash, setIpfsHash] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(
    null
  );
  const account = useAccount();
  const certifyDocument = useCertifyDocument();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Placeholder for actual verification logic
    // Here you would call your smart contract's `verifyDocument` function
    const certified = await certifyDocument.mutateAsync({ ipfsHash });
    if (certified) setVerificationResult(certified);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <Header />
      </div>

      {/* Right side: Description */}
      <div className=" p-8 rounded-lg flex flex-col justify-center w-[80%] mx-auto mt-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-purple-800">
            Why This Matters?
          </h2>
          <p className="text-gray-700 text-xs mb-4">
            Fake certificates are not just pieces of paper—they're instruments
            of deceit. Every time someone uses a fake document, they steal
            opportunities from those who have worked hard and earned their
            credentials. It's a betrayal of trust that can have devastating
            consequences.
          </p>
          <p className="text-gray-700 text-xs mb-4">
            Imagine the heartbreak of a student who studied tirelessly, only to
            have a job or scholarship taken away by someone with a forged
            certificate. Think of the patients who put their lives in the hands
            of doctors with fake qualifications. The damage is real, and it's
            happening all around us.
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-purple-800">
            How We Can Help?
          </h3>
          <p className="text-gray-700 text-xs mb-4">
            Our platform is a stand against this growing problem. By using
            blockchain technology, we make it nearly impossible for fake
            certificates to pass as genuine. Every document is verified, every
            claim is validated. This isn't just about technology—it's about
            restoring trust and ensuring fairness.
          </p>
        </div>
      </div>

      <div className="flex items-center w-[85%] mx-auto justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center w-[50%] mx-auto justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full flex gap-2">
            {/* Left side: Form */}
            <div className="bg-white p-8 rounded-lg w-[100%]">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Certify Document
              </h2>

              <form onSubmit={handleSubmit} className="space-y-10 w-full">
                <div className="w-full">
                  <label
                    htmlFor="ipfsHash"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Certificate Image URL
                  </label>
                  <input
                    type="text"
                    id="ipfsHash"
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                    disabled={certifyDocument.isPending}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={
                      certifyDocument.isPending || ipfsHash.trim() === ""
                    }
                  >
                    {certifyDocument.isPending ? "Verifying..." : "Certify"}
                  </button>
                </div>
              </form>

              {verificationResult !== null && (
                <div
                  className={`mt-8 p-4 rounded-lg font-semibold text-center ${
                    verificationResult
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {verificationResult ? (
                    <div>
                      <p>Certificate verified successfully!</p>
                      <p>Organization Address: {account.address}</p>
                      <p>IPFS Hash: {ipfsHash}</p>
                      <p>Transaction Hash: {verificationResult}</p>
                    </div>
                  ) : (
                    <div>
                      <p>Verification failed!</p>
                      <p>Organization Address: {account.address}</p>
                      <p>IPFS Hash: {ipfsHash}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="w-[50%] flex justify-center">
              {/* <img
              src="/images/certify.svg"
              alt="certify image"
              className="w-[30%]"
            /> */}
            </div>
          </div>
        </div>

        <div className="w-[50%] flex justify-center pl-4 opacity-2">
          <img
            src="https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Justice"
            width="90%"
          />
        </div>
      </div>
    </>
  );
}
