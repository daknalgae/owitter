import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { ref, deleteObject } from "firebase/storage";

const Oweet = ({ oweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newOweet, setNewOweet] = useState(oweetObj.text);
  const OweetTextRef = doc(dbService, "oweets", `${oweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this oweet?");

    if (ok) {
      await deleteDoc(OweetTextRef);
      await deleteObject(ref(storageService, oweetObj.attachmentURL));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(oweetObj, newOweet);
    await updateDoc(OweetTextRef, { text: newOweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewOweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Oweet"
              onChange={onChange}
              value={newOweet}
              required
            />
            <input type="submit" value="Update Oweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{oweetObj.text}</h4>
          {oweetObj.attachmentURL && (
            <img src={oweetObj.attachmentURL} width="100px" height="100px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Oweet</button>
              <button onClick={toggleEditing}>Edit Oweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Oweet;
