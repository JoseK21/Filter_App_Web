import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  socket: any;
  readonly url: string = "ws://localhost:3000"

  constructor() { this.socket = io(this.url) }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data)
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }

  public send_info(size_bytes) {
    var socket = io.connect(this.url);
    socket.emit('my other event', size_bytes);
}

}
