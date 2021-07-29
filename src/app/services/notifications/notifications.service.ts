import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { MessagesModel } from './messages-model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private messagesSubject: BehaviorSubject<
    MessagesModel[]
  > = new BehaviorSubject<MessagesModel[]>([]);
  messages$: Observable<MessagesModel[]> = this.messagesSubject.asObservable();

  notificationAPI = 'http://localhost:3000/api';
  socket: Socket = io('http://localhost:3000');
  randomRoomId: string;

  constructor(private http: HttpClient) {
    this.randomRoomId = uuidv4();
    this.socket.on('connect', () => {
      this.joinNotificationRoom();
    });
    this.socket.on('new-message', (msg: MessagesModel) => {
      this.addNewMsg(msg);
    });
  }

  checkAPI(): Observable<any> {
    return this.http.get<any>(`${this.notificationAPI}/hello`);
  }

  addNewMsg(message: MessagesModel): void {
    const currList = this.messagesSubject.getValue();
    const newList: MessagesModel[] = [message, ...currList];
    this.messagesSubject.next(newList);
  }

  joinNotificationRoom(): void {
    console.log('Room id', this.randomRoomId);
    this.socket.emit('join-room', this.randomRoomId);
  }
}
