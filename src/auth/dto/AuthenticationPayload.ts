// JWT + User Payload
export class AuthenticationPayload {
  user: {
    userId: number;
    displayName: string;
    email: string;
    firstname: string;
    lastname: string;
    avatar: string;
  }
  exp?: number;
  iat?: number;
}
