import { isEmpty } from 'lodash'
import { Config } from './Typings'
import { promises as fs } from 'fs'
import path from 'path'

export async function GetConfig(args: string[]): Promise<Config> {
  let filepath = "config.json"
  if (args.length === 3) {
    filepath = args[2]
  }
  let config: Config = JSON.parse(await fs.readFile(path.join(process.cwd(), filepath), { encoding: 'utf-8' }))
  config = SetBaseConfig(config)
  CheckConfig(config)
  return config
}

export function SetBaseConfig(config: Config): Config {
  const baseConfig: Config = {
    title: "Twitch Video Feed",
    description: "Feed of Twitch video archives",
    link: "",
    excludeTitles: [],
    excludeUsernames: [],
    excludeZeroViewCount: true,
    filename: 'twitch',
    clientID: null,
    clientSecret: null,
    username: null
  }
  return Object.assign(baseConfig, config)
}

export function CheckConfig(config: Config) {
  if (isEmpty(config.username)) {
    throw "Config.Username must not be blank."
  }
  if (isEmpty(config.clientID)) {
    throw "Config.clientID must not be blank."
  }
  if (isEmpty(config.clientSecret)) {
    throw "Config.clientSecret must not be blank."
  }
  if (isEmpty(config.link)) {
    throw "Config.link must not be blank."
  }
}