import 'jasmine'
import rewire from 'rewire'
import TwitchClient from '../TwitchClient'

const MockTwitchClient = rewire<{ default: typeof TwitchClient }>(
  '../TwitchClient'
)

describe('TwitchClient', () => {
  describe('Constructor', () => {
    it('should set the clientid and clientsecret', () => {
      var mockClient = new MockTwitchClient.default('clientid', 'clientsecret')
      expect(mockClient.clientId).toEqual('clientid')
      expect(mockClient.clientSecret).toEqual('clientsecret')
    })
  })
  describe('GetSingleUserID', () => {
    it('should call get', done => {
      const mockNetworkTasks = {
        Get: jasmine.createSpy('Get').and.returnValue({ data: [1] }),
        Login: jasmine
          .createSpy('Login')
          .and.returnValue({ access_token: '12345' })
      }
      MockTwitchClient.__with__({
        NetworkTasks: mockNetworkTasks
      })(async () => {
        var mockClient = new MockTwitchClient.default(
          'clientid',
          'clientsecret'
        )
        const result = await mockClient.GetSingleUserID('username')
        expect(result as any).toEqual(1)
        done()
      })
    })
    it('should return null if no data found', done => {
      const mockNetworkTasks = {
        Get: jasmine.createSpy('Get').and.returnValue({ data: [] }),
        Login: jasmine
          .createSpy('Login')
          .and.returnValue({ access_token: '12345' })
      }
      MockTwitchClient.__with__({
        NetworkTasks: mockNetworkTasks
      })(async () => {
        var mockClient = new MockTwitchClient.default(
          'clientid',
          'clientsecret'
        )
        const result = await mockClient.GetSingleUserID('username')
        expect(mockNetworkTasks.Get).toHaveBeenCalledOnceWith(
          'users',
          {
            login: 'username'
          },
          'clientid',
          '12345'
        )
        expect(result as any).toEqual(null)
        done()
      })
    })
  })
  describe('GetUserFollows', () => {
    it('should call get', done => {
      const mockNetworkTasks = {
        Get: jasmine.createSpy('Get').and.returnValue({ data: [1, 2, 3] }),
        Login: jasmine
          .createSpy('Login')
          .and.returnValue({ access_token: '12345' })
      }
      MockTwitchClient.__with__({
        NetworkTasks: mockNetworkTasks
      })(async () => {
        var mockClient = new MockTwitchClient.default(
          'clientid',
          'clientsecret'
        )
        const result = await mockClient.GetUserFollows('username')
        expect(mockNetworkTasks.Get).toHaveBeenCalledOnceWith(
          'users/follows',
          {
            from_id: 'username',
            first: '100'
          },
          'clientid',
          '12345'
        )
        expect(result as any).toEqual([1,2,3])
        done()
      })
    })
  })
  describe('CheckLogin', () => {
    it('should call login if the accesstoken is not set', (done) => {
      const mockNetworkTasks = {
        Login: jasmine
          .createSpy('Login')
          .and.returnValue({ access_token: '12345' })
      }
      MockTwitchClient.__with__({
        NetworkTasks: mockNetworkTasks
      })(async () => {
        var mockClient = new MockTwitchClient.default(
          'clientid',
          'clientsecret'
        )
        const result = await mockClient.CheckLogin()
        expect(mockNetworkTasks.Login).toHaveBeenCalledWith('clientid', 'clientsecret')
        expect(mockClient.accessToken).toEqual('12345')
        done()
      })
    })
    it('should not call login if the accesstoken is set', (done) => {
      const mockNetworkTasks = {
        Login: jasmine
          .createSpy('Login')
          .and.returnValue({ access_token: '12345' })
      }
      MockTwitchClient.__with__({
        NetworkTasks: mockNetworkTasks
      })(async () => {
        var mockClient = new MockTwitchClient.default(
          'clientid',
          'clientsecret'
        )
        mockClient.accessToken = '333'
        const result = await mockClient.CheckLogin()
        expect(mockNetworkTasks.Login).not.toHaveBeenCalled()
        done()
      })
    })
  })
})
