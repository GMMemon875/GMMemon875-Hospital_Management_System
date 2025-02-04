import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../main";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fatchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/message/getall`,
          { withCredentials: true }
        );

        setMessages(data.Messages);
      } catch (error) {
        console.log("Error ", error);
      }
    };
    fatchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    Frit:Names <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last:Names <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email <span>{element.email}</span>
                  </p>
                  <p>
                    Phone:Number <span>{element.phone}</span>
                  </p>
                  <p>
                    Message <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1> No messages </h1>
        )}
      </div>
    </section>
  );
};

export default Message;
