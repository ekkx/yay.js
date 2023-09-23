/**
 * Base exception for yay.js
 */
export class YJSError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'YJSError';
	}
}

/**
 * Exception raised when an HTTP request fails
 */
export class HTTPError extends YJSError {
	constructor(message: string) {
		super(message);
		this.name = 'HTTPError';
	}
}

/**
 * Exception raised for a 400 HTTP status code
 */
export class BadRequestError extends HTTPError {
	constructor(message: string) {
		super(message);
		this.name = 'BadRequestError';
	}
}

/**
 * Exception raised for a 401 HTTP status code
 */
export class AuthenticationError extends HTTPError {
	constructor(message: string) {
		super(message);
		this.name = 'AuthenticationError';
	}
}

/**
 * Exception raised for a 403 HTTP status code
 */
export class ForbiddenError extends HTTPError {
	constructor(message: string) {
		super(message);
		this.name = 'ForbiddenError';
	}
}

/**
 * Exception raised for a 404 HTTP status code
 */
export class NotFoundError extends HTTPError {
	constructor(message: string) {
		super(message);
		this.name = 'NotFoundError';
	}
}

/**
 * Exception raised for a 429 HTTP status code
 */
export class RateLimitError extends HTTPError {
	constructor(message: string) {
		super(message);
		this.name = 'RateLimitError';
	}
}

/**
 * Exception raised for a 5xx HTTP status code
 */
export class ServerError extends HTTPError {
	constructor(message: string) {
		super(message);
		this.name = 'ServerError';
	}
}

/**
 * レスポンスのエラーコード名
 */
export enum ErrorCode {
	InvalidParameter = -1,
	RegisteredUser = -2,
	AccessTokenExpired = -3,
}
