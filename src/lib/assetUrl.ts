export function resolveBackendAssetUrl(path?: string | null): string {
  if (!path || typeof path !== "string") return "";

  const trimmed = path.trim();
  if (!trimmed) return "";

  // Already a full URL or a data URL
  if (/^data:/i.test(trimmed)) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    // Fall back to whatever was stored (relative path)
    return trimmed;
  }

  let relative = trimmed;

  // Backend sometimes stores without leading slash
  if (relative.startsWith("public/")) {
    relative = "/" + relative;
  }

  if (!relative.startsWith("/")) {
    relative = "/" + relative;
  }

  return baseUrl.replace(/\/$/, "") + relative;
}

export function normalizeBackendImages(images: unknown): string[] {
  if (!images) return [];

  if (Array.isArray(images)) {
    return images.filter(
      (item): item is string =>
        typeof item === "string" && item.trim().length > 0,
    );
  }

  if (typeof images === "string") {
    const trimmed = images.trim();
    if (!trimmed) return [];

    // Many APIs send the array as a JSON string (e.g. "[\"/public/path.jpg\"]")
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string =>
            typeof item === "string" && item.trim().length > 0,
        );
      }
    } catch (_err) {
      // If parsing fails, fall back to treating the string as a single image path
    }

    return [trimmed];
  }

  return [];
}
