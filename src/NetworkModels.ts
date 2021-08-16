export interface User {
  id: string,
  login: string,
  display_name: string
}

export interface Archive {
  id: string,
  user_id: string,
  user_name: string,
  view_count: number,
  title: string,
  description: string,
  published_at: string,
  url: string,
  duration: string,
  thumbnail_url: string
}

export interface Follows {
  from_id: string,
  to_id: string,
  to_name: string
}

export interface APIResponse<T> {
  data: T[]
}

export interface LoginResponse {
  access_token: string,
  expires_in: number,
  token_type: string
}