/**
 * Possible headers for an API call
 */
export interface RequestHeaders {
  Authorization?: string;
  Host: string;
  'User-Agent': string;
  'X-Timestamp': string;
  'X-App-Version': string;
  'X-Device-Info': string;
  'X-Device-UUID': string;
  'X-Client-IP': string;
  'X-Connection-Type': string;
  'X-Connection-Speed': string;
  'Accept-Language': string;
  'Content-Type': string;
}

/**
 * Possible API methods to be used when doing requests
 */
export enum RequestMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT',
}
