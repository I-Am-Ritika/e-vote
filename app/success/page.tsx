// SUCCESS PAGE
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  
  // Mock transaction hash
  const transactionHash = '0x7f9fade1c0d57a7af66ab4ead7c2c2eb7b11a91385c26b4e1b4f4b4f4b4f4b4f';
  
  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const copyTransactionHash = () => {
    navigator.clipboard.writeText(transactionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Hydration-safe date string
  const dateString = useMemo(() => new Date().toLocaleString(), []);

  const downloadSlip = () => {
    // Mock slip download
    const slipData = `
VOTE SLIP - E-Vote Nepal
========================

Election: Nepal General Election
Constituency: Overseas Voters
Date: ${dateString}
Voter ID: ****-****-1234

Selected Candidate: KP OLi
Party: Nepali Congress

Transaction Hash: ${transactionHash}

This slip serves as proof of your participation in the democratic process.
Your vote has been securely recorded on the blockchain.

E-Vote Nepal - Secure Online Voting
    `;
    
    const element = document.createElement('a');
    const file = new Blob([slipData], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'vote-slip.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Confetti random values generated once for hydration consistency
  type Confetti = {
    left: number;
    delay: number;
    duration: number;
    color: string;
  };
  const confetti: Confetti[] = useMemo(() => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
    ];
    return Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confetti.map((c: Confetti, i: number) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${c.left}%`,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.duration}s`,
              }}
            >
              <div className={`w-2 h-2 ${c.color} rounded-full`}></div>
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="flex items-center">
                <img
                  src="logo.jpg"
                  alt="Vote Logo"
                  className="w-16 h-16 rounded-full mr-3"
                />
                <span className="font-['Pacifico'] text-2xl text-blue-900">E-Vote Nepal</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <select className="px-3 py-1 rounded-lg border border-gray-300 text-sm bg-white pr-8">
                <option>English</option>
                <option>Nepali</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step 4 of 4: Vote Complete</span>
            <span className="text-sm text-green-600 font-semibold">100% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full w-full transition-all duration-1000"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          {/* Success Icon */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <i className="ri-check-line text-4xl text-white"></i>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Vote Was Successfully Cast!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thank you for participating in the democratic process. Your vote has been securely recorded on the blockchain and will be counted in the final tally.
            </p>
          </div>

          {/* Vote Confirmation Details */}
          <div className="bg-green-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Vote Confirmation</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Your Selection</h3>
                <p className="text-2xl font-bold text-green-700 mb-1"> KP Oli</p>
                <p className="text-green-600">Nepali Congress</p>
              </div>
              
              <div className="text-center md:text-right">
                <h3 className="font-semibold text-gray-900 mb-2">Vote Cast</h3>
                <p className="text-lg text-gray-700">{dateString}</p>
                <p className="text-sm text-gray-500">Blockchain confirmed</p>
              </div>
            </div>

            {/* Transaction Hash */}
            <div className="border-t border-green-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Blockchain Transaction Hash</h3>
              <div className="flex items-center space-x-4 bg-white rounded-lg p-4">
                <code className="flex-1 text-sm text-gray-800 break-all font-mono">
                  {transactionHash}
                </code>
                <button
                  onClick={copyTransactionHash}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                >
                  {copied ? (
                    <>
                      <i className="ri-check-line mr-1"></i>
                      Copied
                    </>
                  ) : (
                    <>
                      <i className="ri-file-copy-line mr-1"></i>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Save this hash to verify your vote was recorded. You can check it on the blockchain explorer.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <i className="ri-download-line mr-2"></i>
                  Download Slip
                </h3>
                <p className="text-gray-600">
                  Get a detailed slip of your vote for your records.
                </p>
              </div>
              <button
                onClick={downloadSlip}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
              >
                Download
              </button>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <i className="ri-information-line text-yellow-600 mr-3 mt-1"></i>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">What Happens Next?</h3>
                <ul className="text-yellow-700 space-y-2">
                  <li>• Your vote is now part of the immutable blockchain record</li>
                  <li>• Election results will be publicly available after the voting period closes</li>
                  <li>• You can verify your vote was counted using your transaction hash</li>
                  <li>• Official results will be announced by the election commission</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Voting Statistics */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Live Election Statistics</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">847,532</div>
                <div className="text-gray-600">Total Votes Cast</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">68.4%</div>
                <div className="text-gray-600">Voter Turnout</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg text-center whitespace-nowrap cursor-pointer"
            >
              Return to Home
            </Link>
            
            <Link
              href="/admin"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg text-center whitespace-nowrap cursor-pointer"
            >
              View Election Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}