import type { SupabaseClient } from "@supabase/supabase-js";

const MAX_UPLOAD_BYTES = 100 * 1024 * 1024;
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60;

export const UPLOAD_BUCKETS = ["videos", "pdfs", "slides"] as const;
export type UploadBucket = (typeof UPLOAD_BUCKETS)[number];

export function isWithinUploadLimit(bytes: number): boolean {
  return bytes > 0 && bytes <= MAX_UPLOAD_BYTES;
}

export async function createSignedUrl(
  client: SupabaseClient,
  bucket: UploadBucket,
  path: string
): Promise<string> {
  const { data, error } = await client.storage
    .from(bucket)
    .createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS);

  if (error) throw error;
  return data.signedUrl;
}
