import 'jasmine'
import rewire from 'rewire'
import * as FeedTasks from '../FeedTasks'
import { Archive } from '../NetworkModels'
import { Config } from '../Typings'

const MockFeedTasks = rewire<typeof FeedTasks>('../FeedTasks')

describe('FeedTasks', () => {
  describe('GenerateFeed', () => {
    it('should generate the feed with a given config', () => {
      const mockFeedInstance = {
        addItem: jasmine.createSpy('feedInstance.addItem'),
        rss2: jasmine.createSpy('feedInstance.rss2')
      }
      const mockFeed = {
        Feed: jasmine.createSpy('feed.Feed').and.returnValue(mockFeedInstance)
      }
      MockFeedTasks.__with__({
        feed_1: mockFeed
      })(() => {
        const mockConfig = {
          title: 'title',
          description: 'description',
          link: 'link'
        } as any
        const mockVideos: Archive[] = [
          {
            user_name: 'username 1',
            title: 'title 1',
            url: 'url 1',
            description: 'description 1',
            published_at: '0',
            thumbnail_url: 'thumbnail %{width} %{height}',
            duration: 'duration',
            id: 'id',
            user_id: 'userid',
            view_count: 1233
          }
        ]
        const result = MockFeedTasks.GenerateFeed(mockConfig, mockVideos)
        expect(mockFeed.Feed).toHaveBeenCalledWith({
          title: 'title',
          description: 'description',
          id: 'link',
          link: 'link',
          copyright: 'All rights reserved 2021, Ryan Poole',
          author: {
            name: 'Ryan Poole'
          }
        })
        expect(mockFeedInstance.addItem).toHaveBeenCalledWith({
          title: `[username 1] - title 1`,
          id: 'url 1',
          link: 'url 1',
          description: 'description 1',
          date: new Date('0'),
          image: 'thumbnail 640 480'
        })
      })
    })
  })
})
