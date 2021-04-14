type GraphRequestCallback = (error?: any | null, result?: any | null) => void;
type GraphRequestConfig = {
  /**
     * The httpMethod to use for the request, for example "GET" or "POST".
     */
  httpMethod?: string;
  /**
     * The Graph API version to use (e.g., "v2.0")
     */
  version?: string;
  /**
     * The request parameters.
     */
  parameters?: GraphRequestParameters;
  /**
     * The access token used by the request.
     */
  accessToken?: string;
};
type GraphRequestParameters = {
  [key: string]: any;
};
/**
 * Represents a Graph API request and provides batch request supports.
 */
export class FBGraphRequest {
  /**
     * The Graph API endpoint to use for the request, for example "me".
     */
  graphPath: string;

  /**
     * The optional config for the request.
     */
  config: GraphRequestConfig | undefined | null;

  /**
     * Called upon completion or failure of the request.
     */
  callback: GraphRequestCallback | undefined | null;
  /**
     * Constructs a new Graph API request.
     */
  constructor(graphPath: string, config?: GraphRequestConfig | null, callback?: GraphRequestCallback | null);
  /**
     * Adds a string parameter to the request.
     */
  addStringParameter(paramString: string, key: string): void;
}
