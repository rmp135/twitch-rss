import * as NetworkTasks from './NetworkTasks'
import { User, APIResponse, Archive, Follows, LoginResponse } from './NetworkModels'

export default class {
  private accessToken: string

  constructor(private clientId: string, private clientSecret: string) { }
  
  /**
   * Fetches a single Twitch user by username.
   * @param username The username of the Twitch user to fetch.
   * @returns The Twitch user details.
   */
  async GetSingleUserID(username: string): Promise<User> {
    await this.CheckLogin()
    const response = await NetworkTasks.Get<APIResponse<User>>('users', { login: username }, this.clientId, this.accessToken)
    if (response.data.length != 1) {
      return null
    }
    return response.data[0]
  }
  
  /**
   * Fetches 20 archived videos of a given user.
   * @param userid The Twitch user ID to fetch videos for.
   * @returns The first 20 videos of the given user.
   */
  async GetVideosForUser(userid: string) {
    await this.CheckLogin()
    const response = await NetworkTasks.Get<APIResponse<Archive>>('videos', { user_id: userid, 'type': 'archive' }, this.clientId, this.accessToken)
    return response.data
  }
  
  /**
   * Fetches 100 users that a given user follows.
   * @param userid The Twitch user ID to fetch who they follow.
   * @returns The first 100 users that the given user follows.
   */
  async GetUserFollows(userid: string): Promise<Follows[]> {
    await this.CheckLogin()
    const response = await NetworkTasks.Get<APIResponse<Follows>>('users/follows', { from_id: userid, first: "100" }, this.clientId, this.accessToken)
    return response.data
  }
  
  /**
   * Checks that we are logged in, if not, logs in.
   */
  async CheckLogin() {
    if (this.accessToken == undefined) {
      await this.Login()
    }
  }

  /**
   * Logs in to Twitch, storing the access_token in this Client instance.
   */
  async Login() {
    const loginResponse = await NetworkTasks.Login(this.clientId, this.clientSecret);
    this.accessToken = loginResponse.access_token
  }
}
