export interface Config {
  title: string,
  link: string,
  description: string,
  clientID: string,
  clientSecret: string,
  username: string,
  filename: string,
  excludeUsernames: string[],
  excludeTitles: string[],
  excludeZeroViewCount: boolean
}