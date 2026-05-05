const Screen = ({ msgs, user }) => {
  return (
    <div className="messages">
      {msgs.map((msg, i) =>
        msg.type === "ChatMessage" ? (
          msg.user !== user.name ? (
            <div className="msg other" key={i}>
              <span className="user">{msg.user}</span>
              <span className="text">{msg.message}</span>
            </div>
          ) : (
            <div className="msg right" key={i}>
              {msg.message}
            </div>
          )
        ) : (
          <div className="system-msg" key={i}>
            {msg.message}
          </div>
        )
      )}
    </div>
  );
};

export default Screen;