import React, { useState, useEffect } from "react";
import { db, storage } from "./../fbase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Tweet from "../components/Tweet";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// #5-6-5
const Home = ({ userObj }) => {
  // #5-3-2
  const [tweet, setTweet] = useState("");
  // #5-5-1
  const [tweets, setTweets] = useState([]);
  // #6-1-2
  const [attachment, setAttachment] = useState("");
  // #5-5-2
  /* const getTweets = async () => {
    const querySnapshot = await getDocs(collection(db, "tweets"));
    querySnapshot.forEach((doc) => {
      const tweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [tweetObject, ...prev]);
    });
  }; */
  // #5-5-3
  useEffect(() => {
    // getTweets();
    // #5-7-1/#5-7-2
    onSnapshot(collection(db, "tweets"), (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // #5-7-3
      setTweets(tweetArray);
    });
  }, []);
  // #5-3-4
  const onSubmit = async (event) => {
    event.preventDefault();
    // #6-2-3
    let attachmentUrl = "";
    // #6-2-4
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      // #6-2-5
      attachmentUrl = await getDownloadURL(response.ref);
    }
    // #6-2-6
    const tweetObj = {
      // #5-4-1
      text: tweet,
      createdAt: Date.now(),
      // #5-6-5
      creatorId: userObj.uid,
      // #6-2-6
      attachmentUrl,
    };
    // #5-4-1/#6-2-7
    await addDoc(collection(db, "tweets"), tweetObj);
    // #5-4-2
    setTweet("");
    // #6-2-8
    setAttachment("");
  };
  // #5-3-3
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  // #6-1-3
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  // #6-1-4
  const onClearAttachment = () => setAttachment("");
  return (
    <div>
      {/* #5-3-1/#5-3-4 */}
      <form onSubmit={onSubmit}>
        {/* #5-3-1/#5-3-2/#5-3-3 */}
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        {/* 6-1-1/#6-1-3 */}
        <input type="file" accept="image/*" onChange={onFileChange} />
        {/* #5-3-1 */}
        <input type="submit" value="tweet" />
        {/* #6-1-4 */}
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      {/* #5-5-4 */}
      <div>
        {tweets.map((tweet) => (
          /* <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div> */
          // #5-8-3/#5-8-4
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            // #5-8-5
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
