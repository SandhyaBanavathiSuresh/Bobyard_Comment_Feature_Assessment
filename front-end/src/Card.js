import React, { useState } from "react";
import axios from "axios";
import likeLogo from "./images/heart.png";
import logo from "./images/logo.png";

const USER_API_URL = "http://localhost:8080/api/user";

const Card = ({ comment, setUserComment, userComment }) => {
  const [editedCommentText, setEditedCommentText] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);

  const handleEditComment = (id) => {
    if (editedCommentText && commentToEdit !== null) {
      const editedComment = {
        text: editedCommentText,
      };
      axios.put(`${USER_API_URL}/${id}`, editedComment).then((response) => {
        console.log(response);
        setUserComment(
          userComment.map((comment) =>
            comment.id === id
              ? { ...comment, text: response.data.text }
              : comment
          )
        );
      });
      setEditedCommentText("");
      setCommentToEdit(null);
    }
  };

  const handleDeleteComment = (id) => {
    axios.delete(`${USER_API_URL}/${id}`).then(() => {
      setUserComment(userComment.filter((comment) => comment.id !== id));
    });
  };

  const imageurl = comment.image !== "" ? comment.image : null;

  return (
    <div className="comment-list">
      <div key={comment.id} className="comment-card">
        <div className="comment-header">
          <img src={logo} alt="User" className="comment-avatar" />
          <div>
            <p className="comment-author">{comment.author}</p>
            <p className="like-logo">
              <img src={likeLogo} alt="" />
              {comment.likes}
            </p>
            <p className="comment-date">
              {new Date(comment.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        {commentToEdit === comment.id ? (
          <div className="comment-edit">
            <textarea
              value={editedCommentText}
              onChange={(e) => setEditedCommentText(e.target.value)}
              placeholder="Edit your comment"
            />
            <button onClick={() => handleEditComment(comment.id)}>Save</button>
          </div>
        ) : (
          <p className="comment-text">{comment.text}</p>
        )}

        <div className="comment-image">
          <img src={imageurl} alt="" />
        </div>
        <div className="comment-footer">
          <button
            onClick={() => handleDeleteComment(comment.id)}
            className="delete-button"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setEditedCommentText(comment.text);
              setCommentToEdit(comment.id);
            }}
            className="edit-button"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
