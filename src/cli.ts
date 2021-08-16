import TwitchClient from './TwitchClient'
import { flatten, orderBy } from 'lodash'
import { promises as fs} from 'fs'
import { Config } from './Typings'
import * as FeedTasks from './FeedTasks'
import * as ConfigTasks from './ConfigTasks'
import { Archive, Follows } from './NetworkModels'

async function FetchAllUsers(client: TwitchClient, follows: Follows[]): Promise<Archive[]> {
  return flatten(await Promise.all(follows.map(f => client.GetVideosForUser(f.to_id)))) 
}

function FilterVideos(videos: Archive[], config: Config): Archive[] {
  var filteredVideos =
    videos
      .filter(v => !config.excludeTitles.map(s => s.toLowerCase()).some(s => v.title.toLocaleLowerCase().includes(s)))
      .filter(v => !config.excludeUsernames.map(s => s.toLowerCase()).includes(v.user_name.toLowerCase()))
      .filter(v => config.excludeZeroViewCount ? v.view_count !== 0 : true)
      .filter(v => new Date(v.published_at).getTime() >  Date.now() - (86400000 * 2))
    return orderBy(filteredVideos, v => v.published_at, "desc")
}

(async () => {
  try {
    const config = await ConfigTasks.GetConfig(process.argv)
    const client = new TwitchClient(config.clientID, config.clientSecret)
    console.log(`Fetching user details for ${config.username}...`);
    const user = await client.GetSingleUserID(config.username);
    console.log(`Fetching followers for ${config.username}...`);
    const follows = await client.GetUserFollows(user.id);
    console.log(`Fetching videos details for ${follows.length} followers...`);
    const allVideos = await FetchAllUsers(client, follows)
    const filteredVideos = FilterVideos(allVideos, config)
    console.log(`Writing feed to ${config.filename}.xml...`);
    const feed = FeedTasks.GenerateFeed(config, filteredVideos)
    await fs.writeFile(`${config.filename}.xml`, feed)
    console.log('Done')
  } catch (error) {
    console.warn(error)
  }
})()
