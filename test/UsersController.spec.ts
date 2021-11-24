import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('userController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    usersController = new UsersController(usersService);
  });

  describe('index', () => {
    it('should return a user newsfeed', async () => {
      const input = {
        "displayname": "JohnBook2021",
      }

      const result = [{
        id: 1,
        body: "",
        isPublished: true,
        author: 'JohnBook2021'
      }];

      jest.spyOn(usersService, 'findByAuthor').mockImplementation(() => result);

      expect(await usersController.index(input)).toBe(result);
    });
  });
  describe('indexById', () => {
    it('should return a single user by id', async () => {
      const input = {
        "displayname": "john1992",
      }
      const result = {
        "id": 1,
        "displayname": "john1992",
        "email": "john1992@minibook.io"
      }

      jest.spyOn(usersService, 'indexById').mockImplementation(() => result);

      expect(await usersController.indexById(input)).toBe(result);
    });
  });
  describe('profile', () => {
    it('should return current authorized user', async () => {
      const input =  {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5TmFtZSI6IkpvaG5Cb29rMjAyMSIsImVtYWlsIjoiam9obkBtaW5pYm9vay5pbyIsImlkIjoyLCJpYXQiOjE2Mzc3MDY3MzQsImV4cCI6MTYzNzcxMDMzNH0.HLK-CW8Mi_S-xNYLdGuLm6CoRaHcek80RTWyjp1oJ9o"
      }

      const result = {
        "id": 1,
        "displayname": "john1992",
        "email": "john1992@minibook.io"
      }

      jest.spyOn(usersService, 'indexById').mockImplementation(() => result);

      expect(await usersController.profile(input)).toBe(result);
    });
  });
});