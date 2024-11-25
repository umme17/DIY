import React, { useEffect, useState } from "react";
import fetchUserInfo from "../mostUse/UserInfo";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    age: number;
  }
  

interface ReplyAuthorProps {
  authorId: string; // ID of the user (author)
}

const ReplyAuthor: React.FC<ReplyAuthorProps> = ({ authorId }) => {
  const [authorName, setAuthorName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const userData: User = await fetchUserInfo(authorId); // Fetch user info for the author
        setAuthorName(`${userData.first_name} ${userData.last_name}`); // Set the full name
      } catch (err) {
        console.error("Error fetching author info:", (err as Error).message);
        setAuthorName("Unknown User"); // Fallback if fetching fails
      }
    };

    fetchAuthorName();
  }, [authorId]);

  return <span className="font-semibold text-purple-700">{authorName}</span>;
};

export default ReplyAuthor;
