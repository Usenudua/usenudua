'use client';

import { useEffect, useState } from 'react';

type PurchaseState = 'redirecting' | 'fallback';

export default function VerifyPurchasePage() {
  const [state, setState] = useState<PurchaseState>('redirecting');
  const [deepLinkUrl, setDeepLinkUrl] = useState<string>('#');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('bookId') ?? 'ekpurikpu_v1';

    const reference =
      params.get('ref') ??
      params.get('reference') ??
      params.get('txRef') ??
      params.get('transaction_ref') ??
      params.get('order_id') ??
      null;

    console.log('[verify/purchase] received params:', Object.fromEntries(params.entries()));

    const link = reference
      ? `usenudua://book-purchase?bookId=${encodeURIComponent(bookId)}&ref=${encodeURIComponent(reference)}`
      : `usenudua://book-purchase?bookId=${encodeURIComponent(bookId)}`;
    setDeepLinkUrl(link);

    window.location.href = link;

    setTimeout(() => {
      if (!document.hidden) setState('fallback');
    }, 800);
  }, []);

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; }
        .vp-root {
          background-color: #070c14; color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 20px; box-sizing: border-box;
        }
        .vp-card {
          background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(12px); border-radius: 16px; padding: 40px;
          max-width: 440px; width: 100%; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .vp-spinner {
          border: 3px solid rgba(255,255,255,0.1); width: 40px; height: 40px; border-radius: 50%;
          border-left-color: #ff5252; animation: vp-spin 1s linear infinite; margin: 0 auto 20px auto;
        }
        @keyframes vp-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .vp-btn {
          background-color: #ff5252; color: #fff; font-weight: 600; padding: 14px 28px;
          border-radius: 10px; display: inline-block; text-decoration: none;
          box-shadow: 0 4px 14px rgba(255,82,82,0.4);
        }
        .vp-state-body { color: #d1d5db; font-size: 14px; margin-bottom: 24px; }
      `}</style>
      <div className="vp-root">
        <div className="vp-card">
          <h1 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>Usenudua</h1>
          {state === 'redirecting' && (
            <>
              <div className="vp-spinner" style={{ marginTop: 24 }} />
              <p className="vp-state-body">Confirming your purchase…</p>
            </>
          )}
          {state === 'fallback' && (
            <>
              <p className="vp-state-body">
                If the app didn't open automatically, tap below.
              </p>
              <a href={deepLinkUrl} className="vp-btn">Open Usenudua App</a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
