export enum FriendRequestStatus {
  NOTSENT = 'not-sent',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  WAITINGFORRESPONSE = 'waiting-for-response',
}

export interface IFriendRequestStatus {
  status?: FriendRequestStatus;
}

export interface IFriendRequest {
  id: number;
  creatorId: number;
  receiverId: number;
  status: IFriendRequestStatus;
}
