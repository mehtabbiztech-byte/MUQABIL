import resumeEnhanceHandler from '../src/lib/resumeEnhance';

type Response = {
  status: (code: number) => { json: (body: unknown) => void };
  json: (body: unknown) => void;
  setHeader?: (name: string, value: string) => void;
};

type ApiRequest = Parameters<typeof resumeEnhanceHandler>[0];

/**
 * Vercel serverless wrapper for the shared resume enhance handler.
 * Vercel may deliver the request body as an already-parsed object or a raw
 * JSON string; the shared handler handles both.
 */
export default async function handler(req: ApiRequest, res: Response) {
  res.setHeader?.('Cache-Control', 'no-store');
  await resumeEnhanceHandler(req, res);
}
