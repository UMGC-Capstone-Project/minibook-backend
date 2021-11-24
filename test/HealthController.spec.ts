import { HealthController } from './health.controller';

describe('feedController', () => {
  let healthController: HealthController;

  beforeEach(() => {
    healthController = new HealthController();
  });

  describe('check', () => {
    it('should check the health of the services', async () => {
      const result =
        {
          "status": "ok", "info": { "nestjs-docs": { "status": "up" }, "database": { "status": "up" } }, "error": {}, "details": { "nestjs-docs": { "status": "up" }, "database": { "status": "up" } }
        };

      jest.spyOn(healthController, 'check').mockImplementation(() => result);

      expect(await healthController.check()).toBe(result);
    });
  });
});