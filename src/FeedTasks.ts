import { Config } from './Typings'
import { Feed } from 'feed'
import { Archive } from './NetworkModels'

export function GenerateFeed(config: Config, videos: Archive[]): string {
  const feed = new Feed({
    title: config.title,
    description: config.description,
    id: config.link,
    link: config.link,
    copyright: "All rights reserved 2021, Ryan Poole",
    author: {
      name: "Ryan Poole"
    }
  });
  
  videos.forEach(post => {
    feed.addItem({
      title: `[${post.user_name}] - ${post.title}`,
      id: post.url,
      link: post.url,
      description: post.description,
      date: new Date(post.published_at),
      image: post.thumbnail_url.replace("%{width}", "640").replace("%{height}", "480")
    });
  });
  return feed.rss2()
}