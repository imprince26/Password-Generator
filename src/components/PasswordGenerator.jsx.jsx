import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [settings, setSettings] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (settings.uppercase) chars += uppercase;
    if (settings.lowercase) chars += lowercase;
    if (settings.numbers) chars += numbers;
    if (settings.symbols) chars += symbols;

    if (chars === "") {
      setPassword("Please select at least one character type");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-700 px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
           PR Password Generator 
          </h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Password Display */}
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full bg-gradient-to-r from-slate-900 to-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm sm:text-base border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[48px]"
            />
            <div className="flex gap-1">
              <button
                onClick={copyToClipboard}
                className="h-12 w-12 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all border border-slate-600"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-teal-400" />
                )}
              </button>
              <button
                onClick={generatePassword}
                className="h-12 w-12 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all border border-slate-600"
              >
                <RefreshCw className="h-4 w-4 text-teal-400" />
              </button>
            </div>
          </div>

          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">
                Password Length
              </label>
              <span className="text-sm font-medium text-teal-400">
                {length}
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="30"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-teal-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>

          {/* Settings */}
          <div className="space-y-3">
            {Object.entries(settings).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700"
              >
                <label className="text-sm font-medium capitalize text-gray-300 select-none">
                  Include {key}
                </label>
                <button
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                  className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out ${
                    value ? "bg-teal-500" : "bg-slate-600"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      value ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium text-base active:scale-[0.98] transition-transform"
          >
            Generate Password
          </button>

          {/* Copy Alert */}
          {copied && (
            <div className="fixed top-4 right-4 bg-teal-900/90 border border-teal-600 text-teal-100 py-2 px-4 rounded-lg shadow-lg animate-fade-in">
              Password copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
