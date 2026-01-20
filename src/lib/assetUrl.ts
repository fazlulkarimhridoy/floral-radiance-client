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
