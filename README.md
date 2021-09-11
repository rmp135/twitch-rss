# twitch-rss

For the dozen people still using RSS feeds, this node app will generate an RSS compliant XML feed for archived videos of streamers you follow on Twitch. 

Only the previous 2 days of archived videos will be returned per streamer. Only the first 100 followers will be fetched.

This is a command only app, there is no importable library associated with it.

## Usage

1. [Register for a Twitch developer API keys](https://dev.twitch.tv/console/apps/create).
2. Create a config file with the required configuration (see Config below).
3. Run `npx @rmp135/twitch-rss -c config.json` to use the specified config file.

Provided all details are correct, an RSS compliant XML file will be generated in the current working directory.

The username, video title and a thumbnail will be attached if one is available. Unfortunately the game name is not returned from the Twitch API.

## Config

The config file should be in JSON format and specified with the `-c` flag. The below is an example, only the first four fields are required. 

```js
{
  // Required
  "clientID": "dxze2wq3pft0pdg4w7bl4gdb6vbn8o", // Your Twitch developer app ClientID.
  "clientSecret": "2eqiqlepsy62v4vudg8g4u4qweztdk", // Your Twitch developer app Client Secret.
  "username": "maklite", // The username of the account you want to fetch follows for. Can be any account, not restricted to the developer account.
  "link": "https://github.com/feed.xml", // The feed link. Should be the full URL of where the feed is served.
  
  // Optional
  "title": "Twitch Video Feed", // The title of the feed.
  "description": "Feed of Twitch video archives", // The description of the feed.
  "filename": "feed", //The filename (no extension) that the file will be saved as. Defaults to "twitch".
  "excludeZeroViewCount": true, // Some archives will return with a 0 view count. I think these are for archives that haven't completed. This option skips those videos. Default true.
  "excludeUsernames": [ // Array of usernames that will be excluded from the feed.
    "day9tv"
  ],
  "excludeTitles": [ // Array of titles, that when partially matched will be excluded from the feed.
    "#ad"
  ]
}
```
