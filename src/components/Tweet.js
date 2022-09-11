import React, { useState } from "react";
import { db } from "./../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

// #5-8-1/#5-8-2
const Tweet = ({ tweetObj, isOwner }) => {
  // #5-10-1
  const [editing, setEditing] = useState(false);
  // #5-10-2
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  // #5-9
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 이 tweet을 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(db, `tweets/${tweetObj.id}`));
    }
  };
  // #5-10-3
  const toggleEditing = () => setEditing((prev) => !prev);
  // #5-10-8
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  // #5-10-9
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, `tweets/${tweetObj.id}`), {
      text: newTweet,
    });
    setEditing(false);
  };

  return (
    <div>
      {/* #5-10-5 */}
      {editing ? (
        <>
          {/* #5-10-6/#5-10-9 */}
          <form onSubmit={onSubmit}>
            {/* #5-10-6/#5-10-8 */}
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              onChange={onChange}
            />
            {/* #5-10-6 */}
            <input type="submit" value="Update tweet" />
          </form>
          {/* #5-10-7 */}
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          {/* #5-8-2 */}
          <h4>{tweetObj.text}</h4>
          {/* #5-8-6 */}
          {isOwner && (
            <>
              {/* #5-9 */}
              <button onClick={onDeleteClick}>Delete Nweet</button>
              {/* #5-10-4 */}
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
