const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "certifyDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "organizations",
    outputs: [
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registerOrganization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "organization",
        type: "address",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "verifyDocument",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export default abi;
