"use client";

import { useState } from 'react';

export default function Home() {
  const [folio, setFolio] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        body: JSON.stringify({ folio }),
        headers: { 'Content-Type': 'application/json' }
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Miami_Permit_${folio || 'filled'}.pdf`;
      a.click();
    } catch {
      alert('Failed');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">Miami Permit</h1>
        <p className="text-center text-gray-600 mb-6">Enter folio to generate PDF</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Folio (e.g. 12345)"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate PDF'}
          </button>
        </form>
      </div>
    </main>
  );
}
