import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('appController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
    appController = new AppController(appService);
  });

  describe('index', () => {
    it('should return a user newsfeed', async () => {

      const result = {
        "status": 200,
        "timestamp": "2021-11-23T22:54:26.094Z",
        "message": "Difference between a virus and windows ? Viruses rarely fail."
      }

      jest.spyOn(appService, 'getRoot').mockImplementation(() => result);

      expect(await appController.index()).toBe(result);
    });
  });

});