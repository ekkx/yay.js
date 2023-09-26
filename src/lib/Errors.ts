import { ErrorResponse } from '../util/Types';

/**
 * Base exception for yay.js
 */
export class YJSError extends Error {
	constructor(message: string) {
		super(message);
	}
}

/**
 * Exception raised when an HTTP request fails
 */
export class HTTPError extends YJSError {
	readonly response: ErrorResponse;

	constructor(response: ErrorResponse) {
		super(response.message);
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
	ScreenNameAlreadyBeenTaken = -4,
	UserNotFound = -5,
	PostNotFound = -6,
	ChatRoomNotFound = -7,
	ChatMessageNotFound = -8,
	UserNotFoundAtChatRoom = -9,
	UserMustBeOverTwoAtChatRoom = -10,
	IncorrectPassword = -11,
	UserBlocked = -12,
	PrivateUser = -13,
	ApplicationNotFound = -14,
	BadSNSCredentials = -15,
	SNSAlreadyConnected = -16,
	CannotDisconnectSNS = -17,
	AccessTokenInvalid = -18,
	SpotNotFound = -19,
	UserBanned = -20,
	UserTemporaryBanned = -21,
	SchoolInfoChange = -22,
	CannotDeleteNewUser = -26,
	CaptchaRequired = -29,
	FailedToVerifyCaptcha = -30,
	GroupIsFull = -100,
	BannedFromGroup = -103,
	InvalidCurrentPassword = -200,
	InvalidPassword = -201,
	InvalidEmailOrPassword = -202,
	ExistEmail = -203,
	BadEmailReputation = -204,
	ChatRoomIsFull = -308,
	ConferenceIsFull = -309,
	ConferenceInactive = -310,
	GroupOwnerBlockedYou = -312,
	ChatNeedMutualFollowed = -313,
	ConferenceCallIsLocked = -315,
	ConferenceCallIsForFollowersOnly = -317,
	InvalidEmail = -319,
	RegisteredEmail = -320,
	BannedFromCall = -321,
	NotCallOwner = -322,
	NotVipUser = -326,
	BlockingLimitExceeded = -331,
	VerificationCodeWrong = -332,
	VerificationCodeExpired = -333,
	InvalidAppVersion = -334,
	InvalidPhoneNumber = -335,
	FollowLimitation = -336,
	AgeGapNotAllowed = -338,
	GroupOwnerOrGroupModeratorOnly = -339,
	UnableToRegisterUserDueToPolicy = -340,
	SnsShareRewardAlreadyBeenClaimed = -342,
	QuotaLimitExceeded = -343,
	ChatNeedAgeVerified = -346,
	OnlyAgeVerifiedUserCanJoinGroup = -347,
	RequirePhoneVerificationToChat = -348,
	NotPostOwner = -350,
	GroupGenerationNotMatched = -352,
	PhoneNumberCheckVerificationCodeSubmitQuotaExceeded = -355,
	PhoneNumberCheckVerificationCodeRequestQuotaExceeded = -356,
	GroupOfferHasBeenAccepted = -357,
	GroupOfferHasBeenWithdrawn = -358,
	IpBanned = -360,
	NotConnectedToTwitter = -361,
	PrivateUserTimeline = -363,
	CounterRefreshLimitExceeded = -364,
	NotFollowedByOpponent = -367,
	ExceedChangeCountryQuota = -369,
	NotGroupMember = -370,
	GroupPendingTransfer = -371,
	GroupPendingDeputization = -372,
	UserRestrictedChatWithCautionUsers = -373,
	RestrictedCreateChatWithNewUsers = -374,
	RepostPostNotRepostable = -375,
	TooManyAccountsCreated = -376,
	OnlySpecificGenderCanJoinGroup = -377,
	CreateSpecificGenderGroupRequiredGender = -378,
	GroupRelatedExceededNumberOfRelatedGroups = -382,
	ExceededPinnedLimit = -383,
	GroupShareOnTwitterLimitExceeded = -384,
	ReportedContent = -385,
	ConferenceCallIsForMutualFollowsOnly = -402,
	ExceededLimit = -403,
	GroupInviteExceeded = -404,
	PhoneVerificationRequired = -405,
	ContentTooOld = -406,
	PasswordTooShort = -407,
	PasswordTooLong = -408,
	PasswordNotAllowed = -409,
	CommonPassword = -410,
	EmailNotAuthorized = -411,
	UnableToMovePostToThread = -412,
	UnableToPostUrl = -413,
	UnableToSetCall = -977,
	PhoneNumberBanned = -1000,
	TooManyRequests = -5302,
}
