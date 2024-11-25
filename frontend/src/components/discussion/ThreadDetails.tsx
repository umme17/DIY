import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar2 from "../Navbar2"; // Import Navbar2 component
// import Comment from "./Comment";
import RelatedDiscussions from "./RelatedDiscussions";
import CommentSection from "./CommentSection";



// Define the interface for Thread
interface Thread {
  forum_title: string;
  author: string;
  time: string;
  content: string;
}

const ThreadDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the thread ID from URL params
  const [thread, setThread] = useState<Thread | null>(null); // State for thread details
  // const [comments, setComments] = useState<Reply[]>([]); // State for comments
  const [loading, setLoading] = useState(true); // Loading state
  // const [newComment, setNewComment] = useState(""); // State for new comment
  const location = useLocation();

  // Fetch thread from location.state if available
  useEffect(() => {
    if (location.state?.thread) {
      setThread(location.state.thread);
      setLoading(false); // Stop loading if thread is already available
    }
  }, [location.state]);

  if (loading) return <div className="p-4 text-center text-gray-600">Loading...</div>;
  if (!thread) return <div className="p-4 text-center text-gray-600">Thread not found</div>;

  return (
    <div className="bg-white">
      {/* Navbar2 Component */}
      <Navbar2 level="New thread" />

      <div className="max-w-7xl mx-auto px-4 py-6 flex space-x-8">
        {/* Left Section: Thread Content and Comments */}
        <div className="flex-1 space-y-6">
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h1 className="text-3xl font-semibold text-gray-800">{thread.forum_title}</h1>
            <div className="flex items-center text-sm text-gray-600 mt-2 gap-3">
              <span className="font-medium">{thread.author}</span>
              <span className="text-gray-400">{thread.time}</span>
            </div>
            <p className="mt-4 text-gray-800">{thread.content}</p>
          </div>

          <section className="bg-white shadow-lg rounded-xl p-10">
          <CommentSection target_id={Number(id) || 0} target_type ={"forum"} />
        </section>
        </div>

        {/* Right Section: Related Discussions */}
        <div className="w-1/3 flex-shrink-0">
          <div className="p-6 bg-purple-100 rounded-lg shadow border mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Related Discussions</h2>
            <RelatedDiscussions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetails;
