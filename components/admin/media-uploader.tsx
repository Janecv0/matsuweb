"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function MediaUploader() {
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");

  async function uploadFile(file: File) {
    setStatus("Uploading...");
    setUrl("");

    const supabase = createSupabaseBrowserClient();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `uploads/${Date.now()}-${safeName}`;

    const { error } = await supabase.storage.from("media").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

    if (error) {
      setStatus(error.message);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(filePath);
    const {
      data: { user }
    } = await supabase.auth.getUser();

    await supabase.from("media_assets").insert({
      bucket: "media",
      path: filePath,
      public_url: data.publicUrl,
      uploaded_by: user?.id ?? null
    });

    setUrl(data.publicUrl);
    setStatus("Upload complete");
  }

  return (
    <div className="surface max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl">Media Upload</h1>
      <p className="text-sm text-muted">
        Upload an image to Supabase Storage bucket <code>media</code> and reuse the URL in admin forms.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void uploadFile(file);
          }
        }}
        className="focus-ring w-full rounded-lg border border-black/15 bg-white px-3 py-2"
      />

      {status ? <p className="text-sm">{status}</p> : null}
      {url ? (
        <div className="space-y-2 rounded-lg border border-black/10 bg-white/70 p-3 text-sm">
          <p className="font-semibold">Public URL</p>
          <input readOnly value={url} className="w-full rounded border border-black/15 bg-white px-2 py-1" />
        </div>
      ) : null}
    </div>
  );
}
