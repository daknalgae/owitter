import React, { useEffect, useState } from "react";

import { dbService } from "fbase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Oweet from "components/Oweet";
import OweetFactory from "components/OweetFactory";

const Home = ({ userObj }) => {
  const [oweets, setOweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "oweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const oweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOweets(oweetArr);
    });
  }, []);

  return (
    <div>
      <OweetFactory userObj={userObj} />
      <div>
        {oweets.map((oweet) => (
          <Oweet
            key={oweet.id}
            oweetObj={oweet}
            isOwner={oweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
