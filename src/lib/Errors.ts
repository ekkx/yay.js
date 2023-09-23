import { ErrorResponse } from '../util/Types';

/**
 * Base exception for yay.js
 */
export class YJSError extends Error {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(JSON.stringify(response));
		this.response = response;
	}
}

/**
 * Exception raised when an HTTP request fails
 */
export class HTTPError extends YJSError {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(response);
		this.response = response;
	}
}

/**
 * Exception raised for a 400 HTTP status code
 */
export class BadRequestError extends HTTPError {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(response);
		this.response = response;
	}
}

/**
 * Exception raised for a 401 HTTP status code
 */
export class AuthenticationError extends HTTPError {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(response);
		this.response = response;
	}
}

/**
 * Exception raised for a 403 HTTP status code
 */
export class ForbiddenError extends HTTPError {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(response);
		this.response = response;
	}
}

/**
 * Exception raised for a 404 HTTP status code
 */
export class NotFoundError extends HTTPError {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(response);
		this.response = response;
	}
}

/**
 * Exception raised for a 429 HTTP status code
 */
export class RateLimitError extends HTTPError {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(response);
		this.response = response;
	}
}

/**
 * Exception raised for a 5xx HTTP status code
 */
export class ServerError extends HTTPError {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(response);
		this.response = response;
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
