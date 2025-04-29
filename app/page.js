"use client";
import { useState } from "react";
import CryptoJS from "crypto-js";
import img from "../public/img.jpg"

export default function Home() {
  const [key, setKey] = useState('');
  const [data, setData] = useState('');
  const [dcrptData, setDcrptData] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    try {
      const urlDecodedData = decodeURIComponent(data);
      const bytes = CryptoJS.AES.decrypt(urlDecodedData, key);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      const parsed = JSON.parse(decryptedText);
      setDcrptData(JSON.stringify(parsed, null, 2));
    } catch (error) {
      alert("Invalid key or data format.");
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10 banner-img"
    >
      <form
        onSubmit={handleClick}
        className="backdrop-blur-lg bg-black/40 border border-white/10 text-white p-10 rounded-2xl shadow-2xl w-full max-w-7xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-white">🔐 The Decrypter Tool</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-1">Key</label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter decryption key"
                required
                className="w-full px-4 py-2 bg-black/30 border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-1">Encrypted Data</label>
              <textarea
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Paste encrypted data"
                required
                rows={8}
                className="w-full px-4 py-2 bg-black/30 border h-[400px] border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-1">Decrypted Data</label>
            <textarea
              value={dcrptData}
              readOnly
              rows={16}
              className="w-full h-full px-4 py-2 bg-black/20 border border-white text-white rounded-md"
            />
          </div>
        </div>

        <div className="text-center pt-10">
          <button
            type="submit"
            className="px-8 py-3 bg-green-800 text-white font-bold rounded-md shadow hover:bg-white transition"
          >
            Decrypt
          </button>
        </div>
      </form>
    </div>
  );
}
