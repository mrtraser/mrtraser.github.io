import angular from 'angular'
import uirouter from 'angular-ui-router'
import ngMap from 'ngmap'

import routes from './chat.routes.js'
import navbar from './navbar/navbar.component'
import chatArea from './chat-area/chatarea.component'
import ChatService from './chat.service'

export default angular.module('chat.main', [
    uirouter,
    ngMap
])
  .config(routes)
  .component('chatNavbar', navbar)
  .component('chatArea', chatArea)
  .service('ChatService', ChatService)
  .name
