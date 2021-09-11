import 'jasmine'
import rewire from 'rewire'
import * as NetworkTasks from '../NetworkTasks'

const MockNetworkTasks = rewire<typeof NetworkTasks>('../NetworkTasks')

describe('NetworkTasks', () => {
  describe('Get', () => {
    it('should set get with no parameters', done => {
      const mockSearchParamsReturn = {
        toString: jasmine
          .createSpy('searchparams.tostring')
          .and.returnValue('search')
      }
      const mockUrl = {
        URLSearchParams: jasmine
          .createSpy('urlsearchparams')
          .and.returnValue(mockSearchParamsReturn)
      }
      const mockFetchReturn = {
        json: jasmine.createSpy('fetch.json').and.returnValue('fetchjson')
      }
      const mockFetch = {
        default: jasmine
          .createSpy('urlsearchparams')
          .and.returnValue(mockFetchReturn)
      }
      MockNetworkTasks.__with__({
        url_1: mockUrl,
        node_fetch_1: mockFetch
      })(async () => {
        const response = await MockNetworkTasks.Get(
          'path',
          null,
          'clientid',
          'accesstoken'
        )
        expect(mockUrl.URLSearchParams).toHaveBeenCalledWith({})
        expect(mockSearchParamsReturn.toString).toHaveBeenCalled()
        expect(mockFetch.default).toHaveBeenCalledWith(
          'https://api.twitch.tv/helix/path?search',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer accesstoken',
              'client-id': 'clientid'
            }
          }
        )
        done()
      })
    })
    it('should set get with parameters', done => {
      const mockSearchParamsReturn = {
        toString: jasmine
          .createSpy('searchparams.tostring')
          .and.returnValue('search')
      }
      const mockUrl = {
        URLSearchParams: jasmine
          .createSpy('urlsearchparams')
          .and.returnValue(mockSearchParamsReturn)
      }
      const mockFetchReturn = {
        json: jasmine.createSpy('fetch.json').and.returnValue('fetchjson')
      }
      const mockFetch = {
        default: jasmine
          .createSpy('urlsearchparams')
          .and.returnValue(mockFetchReturn)
      }
      MockNetworkTasks.__with__({
        url_1: mockUrl,
        node_fetch_1: mockFetch
      })(async () => {
        const response = await MockNetworkTasks.Get(
          'path',
          {test: '123', another: '123'},
          'clientid',
          'accesstoken'
        )
        expect(mockUrl.URLSearchParams).toHaveBeenCalledWith({test: '123', another: '123'})
        expect(mockSearchParamsReturn.toString).toHaveBeenCalled()
        expect(mockFetch.default).toHaveBeenCalledWith(
          'https://api.twitch.tv/helix/path?search',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer accesstoken',
              'client-id': 'clientid'
            }
          }
        )
        done()
      })
    })
  })
  describe('Login', () => {
    it('should call login with parameters', (done) => {
     
      const mockFetchReturn = {
        json: jasmine.createSpy('fetch.json').and.returnValue('fetchjson')
      }
      const mockFetch = {
        default: jasmine
          .createSpy('urlsearchparams')
          .and.returnValue(mockFetchReturn)
      }

      MockNetworkTasks.__with__({
        node_fetch_1: mockFetch
      })(async () => {
        const response = await MockNetworkTasks.Login(
          'clientid',
          'clientsecret'
        )
        expect(response).toEqual('fetchjson' as any)
        expect(mockFetch.default).toHaveBeenCalledWith(
          'https://id.twitch.tv/oauth2/token?client_id=clientid&client_secret=clientsecret&grant_type=client_credentials',
          {
            method: 'POST'
          }
        )
        done()
      })
    })
  })
})
