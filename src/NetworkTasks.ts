import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import { LoginResponse } from './NetworkModels'

/**
 * Generic GET request.
 * @param path The URL path, minus search parameters.
 * @param params The search parameters in key: value form.
 * @param clientId The Twitch ClientID.
 * @param accessToken The Twitch API Access Token from a login response.
 * @returns The server response as type T.
 */
export async function Get<T> (
  path: string,
  params: { [key: string]: string },
  clientId: string,
  accessToken: string
): Promise<T> {
  const searchParams = new URLSearchParams(params ?? {})

  const url = `https://api.twitch.tv/helix/${path}?${searchParams.toString()}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'client-id': clientId
    }
  })
  const jsonResponse = await response.json()
  return jsonResponse
}

/**
 * A login request.
 * @param clientId The Twitch API ClientID.
 * @param clientSecret The Twitch API Client Secret.
 * @returns Login response.
 */
export async function Login (
  clientId: string,
  clientSecret: string
): Promise<LoginResponse> {
  const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
  const response = await fetch(url, {
    method: 'POST'
  })
  const jsonResponse = await response.json()
  return jsonResponse
}
