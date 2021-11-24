import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    authenticationService = new AuthenticationService();
    authenticationController = new AuthenticationController(authenticationService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const input = {
        "displayname": "JohnBook2021",
        "email": "john@minibook.io",
        "password": "minibook12345"
      }
      const result = {
        "email": "john@minibook.io",
        "displayname": "JohnBook2021",
        "id": 2
      };

      jest.spyOn(authenticationService, 'validateUser').mockImplementation(() => result);

      expect(await authenticationController.login()).toBe(result);
    });
  });
  describe('login', () => {
    it('should register a new user', async () => {
      const input = {
        "email": "john@minibook.io",
        "password": "minibook12345"
      }
      const result = {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5TmFtZSI6IkpvaG5Cb29rMjAyMSIsImVtYWlsIjoiam9obkBtaW5pYm9vay5pbyIsImlkIjoyLCJpYXQiOjE2Mzc3MDY3MzQsImV4cCI6MTYzNzcxMDMzNH0.HLK-CW8Mi_S-xNYLdGuLm6CoRaHcek80RTWyjp1oJ9o"
      }

      jest.spyOn(authenticationService, 'login').mockImplementation(() => result);

      expect(await authenticationController.login()).toBe(result);
    });
  });
  describe('recover', () => {
    it('should register send recovery email', async () => {
      const input = {
        "email": "john@minibook.io",
      }
      const result = {
        "success": "true"
      }

      jest.spyOn(authenticationService, 'login').mockImplementation(() => result);

      expect(await authenticationController.login()).toBe(result);
    });
  });
});