import { useMutation } from "@tanstack/react-query";
import {
  useReadContractVerifyDocument,
  useWriteContractCertifyDocument,
  useWriteContractRegisterOrganization,
} from "./generated/contract";

const contractAddress = "0x39823776e2A932eF5E15134a17aAD144AE5E54f0";

export const useCertifyDocument = () => {
  const contract = useWriteContractCertifyDocument();

  return useMutation({
    onSuccess(data, variables, context) {
      console.log("Successfully certified document", data);
    },
    onError(error, variables, context) {
      console.error("Failed to certify document", error);
    },
    mutationFn: (data: { ipfsHash: string }) => {
      return contract.writeContractAsync({
        args: [data.ipfsHash],
        address: contractAddress,
        __mode: "prepared",
      });
    },
  });
};

export const useRegisterOrganization = () => {
  const contract = useWriteContractRegisterOrganization();

  return useMutation({
    onSuccess(data, variables, context) {
      console.log("Successfully registered organization", data);
    },
    onError(error, variables, context) {
      console.error("Failed to register organization", error);
    },
    mutationFn: () => {
      return contract.writeContractAsync({
        address: contractAddress,
      });
    },
  });
};

export const useContractVerifyDocument = (
  organizationAddress: `0x${string}`,
  ipfsHash: string
) => {
  console.log("first", {
    organizationAddress,
    ipfsHash,
  });
  return useReadContractVerifyDocument({
    address: contractAddress,
    args: [organizationAddress, ipfsHash],

    query: {
      enabled: !!organizationAddress && !!ipfsHash,
      refetchOnWindowFocus: true,
    },
  });
};
