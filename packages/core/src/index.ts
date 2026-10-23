export const serverName = "google-search-console-mcp";

/** Supplies a Google access token. The CLI and a future hosted worker both implement this. */
export interface SearchConsoleAuthProvider {
  getAccessToken: () => Promise<string>;
}
