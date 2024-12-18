
function generateFileHash(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        try {
          // Use Web Crypto API to generate SHA-256 hash
          const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert ArrayBuffer to byte array
          const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join(""); // Convert bytes to hex string
          resolve(hashHex);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  }