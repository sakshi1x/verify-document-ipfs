"use client";

import Header from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="w-[80%] text-3xl sm:text-6xl font-extrabold mb-4">
          Secure and Verify Your Documents with Blockchain
        </h2>
        <p className="text-md mb-8">
          Certify your documents on the blockchain to ensure authenticity and
          tamper-proofing.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="px-8 py-3 text-white font-semibold rounded-full transition"
          >
            Learn more
          </a>
          <a
            href="#"
            className="px-8 py-3 bg-white text-indigo-500 font-semibold rounded-full shadow-lg hover:bg-indigo-100 transition"
          >
            Get Started
          </a>
        </div>
      </main>

      <section className="w-full py-12 px-4 sm:px-8 bg-white text-indigo-500">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <img
            src="https://cdn.hyperverge.co/wp-content/uploads/2023/01/Bank-Account-Verification-scaled.jpg"
            alt="Document Security"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
          <div>
            <h3 className="text-3xl font-bold mb-6">Why Choose Verify?</h3>
            <p className="text-lg mb-8">
              Our platform leverages hedera blockchain to certify and verify
              documents, ensuring that they are tamper-proof and authentic.
              Whether you are a small organization or a large enterprise, our
              solution is scalable and secure.
            </p>
            <a
              href="#"
              className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-400 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 px-4 sm:px-8 text-center bg-indigo-700">
        <p>&copy; 2024 Verify. All rights reserved.</p>
      </footer>
    </div>
  );
}
