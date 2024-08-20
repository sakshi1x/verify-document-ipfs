"use client";

import Header from "@/components/header";
import { useReadContractOrganizations } from "@/contracts/generated/contract";
import { useRegisterOrganization } from "@/contracts/hooks";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Register() {
  const [organizationName, setOrganizationName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const registerOrgantion = useRegisterOrganization();

  const { address } = useAccount();
  const readOrganization = useReadContractOrganizations({
    args: [address as `0x${string}`],

    query: {
      enabled: !!address,
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Placeholder for actual registration logic
    console.log("Registering organization:", organizationName);
    const t = await registerOrgantion.mutateAsync();
    if (t) setIsRegistered(true);
  };

  console.log(registerOrgantion, "is registration organization");

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <Header />
      </div>

      <div className="min-h-[90vh]  flex items-center justify-center bg-gray-100">
        <div className="p-8 rounded-lg w-full max-w-[600px]">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Register as an Organization
          </h2>
          <p className="text-center text-sm">
            Click register button to register as an organization. You will be
            able to verify certificates for your certificants after you verify
            as an organization. Please, display your wallet address in your
            official website, so that verifiers will be able to verify the
            wallet address belongs to your organization.{" "}
          </p>

          {!isRegistered && (
            <form onSubmit={handleSubmit}>
              <button
                disabled={registerOrgantion.isPending}
                type="submit"
                className="w-full py-2 px-4 mt-8 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition"
              >
                Register
              </button>
            </form>
          )}
          {registerOrgantion?.data && (
            <div className="text-justify">
              <h3 className="text-xl font-bold text-green-600 mb-4">
                Registration Successful!
              </h3>
              <p className="text-gray-700">
                Your organization has been successfully registered.
              </p>
              <p>
                The transaction hash is:{" "}
                <span className="font-semibold">{registerOrgantion?.data}</span>
              </p>
            </div>
          )}
          {registerOrgantion.isPending && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-800">
                Registering organization...
              </p>
            </div>
          )}

          {
            //@ts-ignore
            registerOrgantion?.error?.cause?.reason && (
              <div className="mt-8 text-red-500">
                {
                  //@ts-ignore
                  registerOrgantion?.error?.cause?.reason
                }
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}
