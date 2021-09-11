import 'jasmine'
import rewire from 'rewire'
import * as Helpers from '../Helpers'
import { Archive, Follows } from '../NetworkModels'
import TwitchClient from '../TwitchClient'
import { Config } from '../Typings'

const MockHelpers = rewire<typeof Helpers>('../Helpers')

describe('Helpers', () => {
  describe('FetchAllUsers', () => {
    it('should fetch all videos for all users and flatten', async () => {
      const mockClient: TwitchClient = {
        GetVideosForUser: jasmine.createSpy('GetVideosForUser').and.returnValues(Promise.resolve([1]),Promise.resolve([2]),Promise.resolve([3]),)
      } as any
      const mockFollows: Follows[] = [{ to_id: '1' } as any, { to_id: '2' } as any, { to_id: '3' } as any]
      const response = await MockHelpers.FetchAllUsers(mockClient, mockFollows)
      expect(mockClient.GetVideosForUser).toHaveBeenCalledWith('1')
      expect(mockClient.GetVideosForUser).toHaveBeenCalledWith('2')
      expect(mockClient.GetVideosForUser).toHaveBeenCalledWith('3')
      expect(response).toEqual([1,2,3] as any)
    }) 
  })
  describe('FilterVideos', () => {
    it('should filter no videos', () => {
      const mockVideos : Archive[] = [
        {
          title: 'title 1',
          user_name: 'user 1',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'title 2',
          user_name: 'user 2',
          view_count: 0,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'title 3',
          user_name: 'user 3',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
      ]
      const mockConfig: Config = {
        excludeZeroViewCount: false,
        excludeTitles: [],
        excludeUsernames: [],
      } as Config
      const response = MockHelpers.FilterVideos(mockVideos, mockConfig)
      expect(response.length).toBe(3)
    }) 
    it('should filter on published_at', () => {
      const mockVideos : Archive[] = [
        {
          title: 'title 1',
          user_name: 'user 1',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'title 2',
          user_name: 'user 2',
          view_count: 0,
          published_at: new Date(Date.now() - 182800000).toISOString(),
        } as Archive,
        {
          title: 'title 3',
          user_name: 'user 3',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
      ]
      const mockConfig: Config = {
        excludeZeroViewCount: false,
        excludeTitles: [],
        excludeUsernames: [],
      } as Config
      const response = MockHelpers.FilterVideos(mockVideos, mockConfig)
      expect(response.length).toBe(2)
      expect(response[0].user_name).toEqual('user 1')
      expect(response[1].user_name).toEqual('user 3')
    }) 
    it('should order on published_at', () => {
      const mockVideos : Archive[] = [
        {
          title: 'title 1',
          user_name: 'user 1',
          view_count: 1,
          published_at: new Date(Date.now() - 10).toISOString(),
        } as Archive,
        {
          title: 'title 2',
          user_name: 'user 2',
          view_count: 0,
          published_at: new Date(Date.now() - 30).toISOString(),
        } as Archive,
        {
          title: 'title 3',
          user_name: 'user 3',
          view_count: 1,
          published_at: new Date(Date.now() - 20).toISOString()
        } as Archive,
      ]
      const mockConfig: Config = {
        excludeZeroViewCount: false,
        excludeTitles: [],
        excludeUsernames: [],
      } as Config
      const response = MockHelpers.FilterVideos(mockVideos, mockConfig)
      expect(response.length).toBe(3)
      expect(response[0].user_name).toEqual('user 1')
      expect(response[1].user_name).toEqual('user 3')
      expect(response[2].user_name).toEqual('user 2')
    }) 
    it('should filter on zero views', () => {
      const mockVideos : Archive[] = [
        {
          title: 'title 1',
          user_name: 'user 1',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'title 2',
          user_name: 'user 2',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'title 3',
          user_name: 'user 3',
          view_count: 0,
          published_at: new Date().toISOString(),
        } as Archive,
      ]
      const mockConfig: Config = {
        excludeZeroViewCount: true,
        excludeTitles: [],
        excludeUsernames: [],
      } as Config
      const response = MockHelpers.FilterVideos(mockVideos, mockConfig)
      expect(response.length).toBe(2)
      expect(response[0].user_name).toEqual('user 1')
      expect(response[1].user_name).toEqual('user 2')
    }) 
    it('should filter on exact username', () => {
      const mockVideos : Archive[] = [
        {
          title: 'title 1',
          user_name: 'delete user 1',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'title 2',
          user_name: 'user 2',
          view_count: 0,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'title 3',
          user_name: 'delete user 3',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
      ]
      const mockConfig: Config = {
        excludeZeroViewCount: false,
        excludeTitles: [],
        excludeUsernames: [
          'delete',
          'delete user 3'
        ],
      } as Config
      const response = MockHelpers.FilterVideos(mockVideos, mockConfig)
      expect(response.length).toBe(2)
      expect(response[0].user_name).toEqual('delete user 1')
      expect(response[1].user_name).toEqual('user 2')
    }) 
    it('should filter on title', () => {
      const mockVideos : Archive[] = [
        {
          title: 'remove title 1',
          user_name: 'user 1',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'title 2',
          user_name: 'user 2',
          view_count: 0,
          published_at: new Date().toISOString(),
        } as Archive,
        {
          title: 'remove title 3',
          user_name: 'user 3',
          view_count: 1,
          published_at: new Date().toISOString(),
        } as Archive,
      ]
      const mockConfig: Config = {
        excludeZeroViewCount: false,
        excludeTitles: [
          'remove'
        ],
        excludeUsernames: [],
      } as Config
      const response = MockHelpers.FilterVideos(mockVideos, mockConfig)
      expect(response.length).toBe(1)
      expect(response[0].title).toEqual('title 2')
    }) 
  })
})
