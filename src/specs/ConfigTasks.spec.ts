import 'jasmine'
import rewire from 'rewire'
import * as ConfigTasks from '../ConfigTasks'

const MockConfigTasks = rewire<typeof ConfigTasks>('../ConfigTasks')

describe('ConfigTasks', () => {
  describe('GetConfig', () => {
    it('should join paths to get the config path', (done) => {
      const mockCheckConfig = jasmine.createSpy('checkConfig')
      const mockSetBaseConfigResponse = {}
      const mockSetBaseConfig = jasmine.createSpy('setConfig').and.returnValue(mockSetBaseConfigResponse)
      const mockPath = {
        default: {
          join: jasmine.createSpy('join').and.returnValue('full path')
        }
      }
      const mockFs = {
        promises: {
          readFile: jasmine.createSpy('readFile').and.returnValue(Promise.resolve('{"test": "test"}'))
        }
      }
      MockConfigTasks.__with__({
        CheckConfig: mockCheckConfig,
        SetBaseConfig: mockSetBaseConfig,
        fs_1: mockFs,
        path_1: mockPath
      })(async () => {
        const filePath = 'filepath'
        const result = await MockConfigTasks.GetConfig(filePath)
        expect(mockPath.default.join).toHaveBeenCalled()
        expect(mockPath.default.join.calls.argsFor(0)[1]).toEqual(filePath)
        expect(result).toEqual(mockSetBaseConfigResponse as any)
        done()
      })
    })
  })
  describe('SetBaseConfig', () => {
    it('should set the base config options', () => {
      const mockConfig = {
        description: "Feed of Twitch video archives",
        link: "123",
        excludeTitles: [],
        excludeUsernames: [],
        filename: 'aaa',
        clientID: null,
        clientSecret: null,
      } as any
      const originalAssign = Object.assign
      Object.assign = jasmine.createSpy('assign', originalAssign).and.callThrough()
      const result = MockConfigTasks.SetBaseConfig(mockConfig)
      expect(Object.assign).toHaveBeenCalledOnceWith(jasmine.anything(), mockConfig)
      Object.assign = originalAssign
      expect(result).toEqual({
        title: "Twitch Video Feed",
        description: "Feed of Twitch video archives",
        link: "123",
        excludeTitles: [],
        excludeUsernames: [],
        excludeZeroViewCount: true,
        filename: 'aaa',
        clientID: null,
        clientSecret: null,
        username: null
      })
    })
  })
  describe('CheckConfig', () => {
    it('should set the base config options', () => {
      const mockLodash = {
        isEmpty: jasmine.createSpy('isEmpty').and.returnValue(false)
      }
      MockConfigTasks.__with__({
        lodash_1: mockLodash
      })(() => {
        const mockConfig = {
          username: "username",
          clientID: "clientid",
          clientSecret: "clientSecret",
          link: "link"
        } as any
        MockConfigTasks.CheckConfig(mockConfig)
        expect(mockLodash.isEmpty.calls.argsFor(0)[0]).toEqual("username")
        expect(mockLodash.isEmpty.calls.argsFor(1)[0]).toEqual("clientid")
        expect(mockLodash.isEmpty.calls.argsFor(2)[0]).toEqual("clientSecret")
        expect(mockLodash.isEmpty.calls.argsFor(3)[0]).toEqual("link")
      })
    })
  })
})
