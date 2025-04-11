export const buildMessageHtml = (messageObj) => `
    <li>
        <div class="user-image">
            <img src="${messageObj.avatar}" width="50px" height="50px"/>
        </div>
        <div class="user-message">
            <div class="user-name-time">${messageObj.userName} <span>${new Date(
  messageObj.date
).toLocaleString()}</span></div>
            <div class="message-text">${messageObj.newMessage}</div>
        </div>
    </li>    
`;
