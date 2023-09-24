export interface User {
	age_verified: boolean;
	biography: string;
	birth_date: string;
	blocking_limit: number;
	chat_request: boolean;
	connected_by?: string[];
	contact_phones?: string[];
	country_code: string;
	cover_image: string;
	cover_image_thumbnail: string;
	created_at: number;
	dangerous_user: boolean;
	email_confirmed: boolean;
	facebook_connected?: boolean;
	follow_pending: boolean;
	followed_by: boolean;
	followers_count: number;
	following: boolean;
	followings_count: number;
	from_different_generation_and_trusted: boolean;
	gender: number;
	generation: number;
	gifting_ability: GiftingAbility;
	group_phone_on: boolean;
	group_user: GroupUser;
	group_video_on: boolean;
	groups_users_count: number;
	hidden: boolean;
	hide_vip: boolean;
	id: number;
	interests_count: number;
	interests_selected: boolean;
	is_private: boolean;
	last_loggedin_at: number;
	line_connected?: boolean;
	lobi_connected?: boolean;
	login_streak_count?: number;
	masked_email?: string;
	mobile_number?: string;
	new_user: boolean;
	nickname: string;
	online_status: string;
	phone_on?: boolean;
	posts_count: number;
	prefecture: string;
	profile_icon: string;
	profile_icon_thumbnail: string;
	push_notification?: boolean;
	recently_kenta: boolean;
	restricted_review_by: string;
	reviews_count: number;
	title: string;
	twitter_id?: string;
	updated_at: number;
	username: string;
	uuid?: string;
	video_on?: boolean;
	vip: boolean;
	vip_until?: number;
}

export interface GiftingAbility {
	can_receive: boolean;
	can_send: boolean;
	enabled: boolean;
	user_id: number;
}

export interface GroupUser {
	user: User;
	is_moderator: boolean;
	pending_transfer: boolean;
	pending_deputize: boolean;
	title: string;
}
