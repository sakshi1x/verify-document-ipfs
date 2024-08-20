import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const contractAbi = [
  {
    type: "function",
    inputs: [{ name: "ipfsHash", internalType: "string", type: "string" }],
    name: "certifyDocument",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "organizations",
    outputs: [{ name: "exists", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "registerOrganization",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "organization", internalType: "address", type: "address" },
      { name: "ipfsHash", internalType: "string", type: "string" },
    ],
    name: "verifyDocument",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link contractAbi}__
 */
export const useReadContract = /*#__PURE__*/ createUseReadContract({
  abi: contractAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"organizations"`
 */
export const useReadContractOrganizations = /*#__PURE__*/ createUseReadContract(
  { abi: contractAbi, functionName: "organizations" }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"verifyDocument"`
 */
export const useReadContractVerifyDocument =
  /*#__PURE__*/ createUseReadContract({
    abi: contractAbi,
    functionName: "verifyDocument",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link contractAbi}__
 */
export const useWriteContract = /*#__PURE__*/ createUseWriteContract({
  abi: contractAbi,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"certifyDocument"`
 */
export const useWriteContractCertifyDocument =
  /*#__PURE__*/ createUseWriteContract({
    abi: contractAbi,
    functionName: "certifyDocument",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"registerOrganization"`
 */
export const useWriteContractRegisterOrganization =
  /*#__PURE__*/ createUseWriteContract({
    abi: contractAbi,
    functionName: "registerOrganization",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link contractAbi}__
 */
export const useSimulateContract = /*#__PURE__*/ createUseSimulateContract({
  abi: contractAbi,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"certifyDocument"`
 */
export const useSimulateContractCertifyDocument =
  /*#__PURE__*/ createUseSimulateContract({
    abi: contractAbi,
    functionName: "certifyDocument",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link contractAbi}__ and `functionName` set to `"registerOrganization"`
 */
export const useSimulateContractRegisterOrganization =
  /*#__PURE__*/ createUseSimulateContract({
    abi: contractAbi,
    functionName: "registerOrganization",
  });
