
import { flatten, orderBy } from 'lodash'
import { Follows, Archive } from './NetworkModels'
import TwitchClient from './TwitchClient'
import { Config } from './Typings'

export async function FetchAllUsers(client: TwitchClient, follows: Follows[]): Promise<Archive[]> {
  return flatten(await Promise.all(follows.map(f => client.GetVideosForUser(f.to_id)))) 
}

export function FilterVideos(videos: Archive[], config: Config): Archive[] {
  var filteredVideos =
    videos
      .filter(v => !config.excludeTitles.map(s => s.toLowerCase()).some(s => v.title.toLocaleLowerCase().includes(s)))
      .filter(v => !config.excludeUsernames.map(s => s.toLowerCase()).includes(v.user_name.toLowerCase()))
      .filter(v => config.excludeZeroViewCount ? v.view_count !== 0 : true)
      .filter(v => new Date(v.published_at).getTime() > Date.now() - (172800000 /** 2 days */))
    return orderBy(filteredVideos, v => v.published_at, "desc")
}