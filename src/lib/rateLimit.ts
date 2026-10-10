/**
 * Lightweight fixed-window in-memory rate limiter.
 *
 * Used by both runtimes (Express server and Vercel serverless functions) to
 * protect the paid Gemini endpoints from abuse. State is per process/instance,
 * which is the correct scope for each runtime:
 *  - Express: one long-lived process → true per-IP windowing.
 *  - Vercel: per function instance → best-effort throttling, plus Vercel's
 *    own upstream limits as a second layer.
 */

export interface RateLimiterOptions {
  /** Window length in milliseconds. */
  windowMs: number;
  /** Maximum requests per key per window. */
  max: number;
}

export interface RateLimiter {
  /**
   * Consume one request for the given key.
   * Returns `true` when the request is allowed, `false` when the limit is hit.
   */
  hit: (key: string) => boolean;
  /** Total number of active windows (useful for tests / diagnostics). */
  size: () => number;
  /** Drop expired windows. Called automatically, exposed for tests. */
  prune: () => void;
}

interface Window {
  count: number;
  resetAt: number;
}

export function createRateLimiter(options: RateLimiterOptions, now: () => number = Date.now): RateLimiter {
  const windows = new Map<string, Window>();
  const { windowMs, max } = options;

  const prune = () => {
    const t = now();
    for (const [key, win] of windows) {
      if (win.resetAt <= t) windows.delete(key);
    }
  };

  const hit = (key: string): boolean => {
    const t = now();
    prune();
    const existing = windows.get(key);
    if (!existing || existing.resetAt <= t) {
      windows.set(key, { count: 1, resetAt: t + windowMs });
      return true;
    }
    existing.count += 1;
    return existing.count <= max;
  };

  return { hit, size: () => windows.size, prune };
}

/**
 * Extract the best available client IP from an Express-style or Vercel-style
 * request object.
 */
export function clientIp(req: { ip?: string; headers?: Record<string, string | string[] | undefined> }): string {
  const headers = req.headers ?? {};
  const first = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) return value[0] || '';
    return value || '';
  };
  return (
    first(headers['x-forwarded-for']) ||
    first(headers['cf-connecting-ip']) ||
    first(headers['x-real-ip']) ||
    (typeof req.ip === 'string' ? req.ip : '') ||
    'unknown'
  ).split(',')[0].trim() || 'unknown';
}

/** Standard 429 response helper shared by both runtimes. */
export function rateLimitResponse(res: { status: (code: number) => { json: (body: unknown) => void } }): void {
  res.status(429).json({
    error: 'Too many requests. Please wait a moment and try again.',
    retryAfterSeconds: 30,
  });
}
