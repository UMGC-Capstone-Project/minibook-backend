import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

describe('feedController', () => {
  let feedController: FeedController;
  let feedService: FeedService;

  beforeEach(() => {
    feedService = new FeedService();
    feedController = new FeedController(feedService);
  });

  describe('index', () => {
    it('should register a new user', async () => {
      const input = {
        "displayname": "JohnBook2021",
      }

      const result = [{
        id: 1,
        body: "",
        isPublished: true,
        author: 'JohnBook2021'
      }];

      jest.spyOn(feedService, 'findByAuthor').mockImplementation(() => result);

      expect(await feedController.index(input)).toBe(result);
    });
  });
  describe('create', () => {
    it('should register a new user', async () => {
      const input = {
        "email": "john@minibook.io",
        "password": "minibook12345"
      }
      const result = {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5TmFtZSI6IkpvaG5Cb29rMjAyMSIsImVtYWlsIjoiam9obkBtaW5pYm9vay5pbyIsImlkIjoyLCJpYXQiOjE2Mzc3MDY3MzQsImV4cCI6MTYzNzcxMDMzNH0.HLK-CW8Mi_S-xNYLdGuLm6CoRaHcek80RTWyjp1oJ9o"
      }

      jest.spyOn(feedService, 'login').mockImplementation(() => result);

      expect(await feedController.create(input)).toBe(result);
    });
  });
  describe('update', () => {
    it('should register send recovery email', async () => {
      const input = {
        "email": "john1992@minibook.io",
        "displayname": "John1992"
      }
      const result = {
        "success": "true"
      }

      jest.spyOn(feedService, 'login').mockImplementation(() => result);

      expect(await feedController.update(input)).toBe(result);
    });
  });
  describe('delete', () => {
    it('should register send recovery email', async () => {
      const input = {
        "email": "john@minibook.io",
      }
      const result = {
        "success": "true"
      }

      jest.spyOn(feedService, 'delete').mockImplementation(() => result);

      expect(await feedController.delete(input)).toBe(result);
    });
  });
});