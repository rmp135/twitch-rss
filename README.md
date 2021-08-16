# twitch-rss

For the dozen people still using RSS feeds, this node app will generate an RSS compliant XML feed for archived videos of streamers you follow on Twitch.

## Usage

1. [Register for a Twitch developer API keys](https://dev.twitch.tv/console/apps/create).
2. Create a config file in the current working directory with the required configuration (see Config below).
3. Run `npm i -g rmp135/twitch-rss` to install globally directly from GitHub. 
4. Run `npx twitch-rss` to use the config file "config.json". Or, `npx twitch-rss file.json` to use a specific config file.

Provided all details are correct, an XML file will be generated.

The username, video title and a thumbnail will be attached if one is available. Unfortunately the game name is not returned from the Twitch API.

## Config

The config file should be a JSON file placed in the current working directory. The below is an example, only the first four fields are required. 

```json
{
  "clientID": "dxze2wq3pft0pdg4w7bl4gdb6vbn8o",
  "clientSecret": "2eqiqlepsy62v4vudg8g4u4qweztdk",
  "username": "maklite",
  "link": "https://github.com/feed.xml",
  
  "title": "Twitch Video Feed",
  "description": "Feed of Twitch video archives",
  "filename": "feed",
  "excludeZeroViewCount": true,
  "excludeUsernames": [
    "day9tv"
  ],
  "excludeTitles": [
    "#ad"
  ]
}
```

**clientID**

**Required**. Your Twitch developer app ClientID.

**clientSecret**

**Required**. Your Twitch developer app Client Secret.

**username**

**Required**. The username of the account you want to fetch follows for. Can be any account, not restricted to the developer account.

**link**

**Required**. The feed link. Should be the full URL of where the feed is served.

**title**

The title of the feed.

**description**

The description of the feed.

**filename**

The filename (no extension) that the file will be saved as. Defaults to "twitch".

**excludeZeroViewCount**

Some archives will return with a 0 view count. I think these are for archives that haven't completed. This option skips those videos. Default true.

**excludeUsernames**

Array of usernames that will be excluded from the feed.

**excludeTitles**

Array of titles, that when partially matched will be excluded from the feed.