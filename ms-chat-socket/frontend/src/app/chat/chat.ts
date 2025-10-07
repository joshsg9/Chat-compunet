import { Component } from '@angular/core';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
  imports: [CommonModule, FormsModule]
})
export class ChatComponent {
  message = '';
  messages: { user: string; message: string }[] = [];
  username = '';
  roomId = 'room1';
  private stompClient: any;

  constructor() {
    this.username = prompt('Ingresa tu nombre:') || 'Anónimo';
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/chat-socket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${this.roomId}`, (message: any) => {
        const msg = JSON.parse(message.body);
        this.messages.push(msg);
      });
    });
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      const chatMessage = { user: this.username, message: this.message };
      this.stompClient.send(`/app/chat/${this.roomId}`, {}, JSON.stringify(chatMessage));
      this.message = '';
    }
  }
}
