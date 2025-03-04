import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./images/logo.png";
import likeLogo from "./images/heart.png";
import Card from "./Card";

const USER_API_URL = "http://localhost:8080/api/user";
const API_URL = "http://localhost:8080/api/comment";

const Home = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editedCommentText, setEditedCommentText] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [userComment, setUserComment] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => setComments(response.data));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
    // setSelectedFile(file.name);
    setPreviewUrl(URL.createObjectURL(file)); // To preview selected image
  };

  const handleUpload = async () => {};

  const handleAddComment = () => {
    if (newComment) {
      // const formData = new FormData();
      // formData.append("text", newComment);
      // if (selectedFile) {
      //     formData.append("image", selectedFile);
      // }

      const newCommentText = {
        text: newComment,
        image: "https://loremflickr.com/200/200?random=3",
      };

      axios.post(API_URL, newCommentText).then((response) => {
        setComments([...comments, response.data]);
        setNewComment("");
      });
    }
  };

  const handleDeleteComment = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setComments(comments.filter((comment) => comment.id !== id));
    });
  };

  const handleEditComment = (id) => {
    if (editedCommentText && commentToEdit !== null) {
      const editedComment = {
        text: editedCommentText,
      };
      axios.put(`${API_URL}/${id}`, editedComment).then((response) => {
        console.log(response);
        setComments(
          comments.map((comment) =>
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

  useEffect(() => {
    axios.get(USER_API_URL).then((response) => setUserComment(response.data));
  }, []);

  return (
    <>
      {/* admin */}
      <div className="comment-list">
        {/* Sample Navbar */}
        <nav className="nav">
          <div>App Name</div>
          <div>User Details</div>
          <div>Profile</div>
          <div>Settings</div>
        </nav>

        <div>
          {/* To Upload Image */}
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}
          <button onClick={handleUpload}>Upload Image</button>
        </div>

        {/* To add comment */}
        <div className="add-comment">
          <p>Thoughts:</p>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a new comment"
          />
          <button onClick={handleAddComment}>Post</button>
        </div>

        {/* Display all the comments */}
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <img src={logo} alt="User" className="comment-avatar" />
              <div>
                <p className="comment-author">{comment.author}</p>
                <p className="like-logo">
                  <img src={likeLogo} alt="" />{comment.likes}
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
                <button onClick={() => handleEditComment(comment.id)}>
                  Save
                </button>
              </div>
            ) : (
              <p className="comment-text">{comment.text}</p>
            )}

            <div className="comment-image">
              <img src={comment.image} alt="" />
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
        ))}
      </div>

      {/* Other authors */}
      <div>
        {userComment.map((user) => (
          <div key={user.id} className="card">
            <Card
              comment={user}
              setUserComment={setUserComment}
              userComment={userComment}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
