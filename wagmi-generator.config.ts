import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import abi from "./abis";

export default defineConfig([
  {
    out: "src/contracts/generated/contract.ts",
    contracts: [
      {
        name: "Contract",
        abi,
      },
    ],
    plugins: [react()],
  },
]);
