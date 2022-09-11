import React, { useState, useEffect } from "react";
import { db } from "./../fbase";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
import Tweet from "../components/Tweet";

// #5-6-5
const Home = ({ userObj }) => {
  // #5-3-2
  const [tweet, setTweet] = useState("");
  // #5-5-1
  const [tweets, setTweets] = useState([]);
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
    // #5-4-1
    await addDoc(collection(db, "tweets"), {
      text: tweet,
      createdAt: Date.now(),
      // #5-6-5
      creatorId: userObj.uid,
    });
    // #5-4-2
    setTweet("");
  };
  // #5-3-3
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
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
        {/* #5-3-1 */}
        <input type="submit" value="tweet" />
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
