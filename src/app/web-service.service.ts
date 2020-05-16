import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

/* var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fs = require('fs');

const { exec } = require("child_process");
const { execFile } = require('child_process'); */

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  socket: any;
  readonly url: string = "ws://localhost:3020"
  /* readonly url: string = "127.0.0.1:1717" */

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

  public send_info(json) {
    var socket = io.connect(this.url);
    socket.emit('my other event', json);
  }


  public hard_function(){
    
  }

}
