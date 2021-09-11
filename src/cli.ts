import TwitchClient from './TwitchClient'
import { promises as fs} from 'fs'
import * as FeedTasks from './FeedTasks'
import * as ConfigTasks from './ConfigTasks'
import { FetchAllUsers, FilterVideos } from './Helpers'
import yargs from 'yargs'

const args = yargs(process.argv)
.alias('c', 'config')
.describe('c', 'Config file.')
.demandOption(['c'])
.argv as any

export async function RunCli() {
  const config = await ConfigTasks.GetConfig(args.config)
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
}

(async () => {
  try {
    await RunCli()
  } catch (error) {
    console.warn(error)
  }
})()
