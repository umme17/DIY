import React, { useState } from 'react';

interface ForumCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const predefinedTags = ['Technology', 'Science', 'Health', 'Education', 'Business'];

const ForumCreateModal: React.FC<ForumCreateModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [userTag, setUserTag] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const handleTagSelect = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleUserTagAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (userTag && !tags.includes(userTag)) {
      setTags((prevTags) => [...prevTags, userTag]);
      setUserTag('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/forums/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          topic: title,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create forum: ${response.status}`);
      }

      const data = await response.json();
      console.log('Forum created successfully:', data);

      setStatus('success');  // Set status to success on successful creation
      setTitle('');           // Clear the title field after submission
      setTags([]);            // Clear the selected tags after submission

      setTimeout(() => {
        onClose();            // Close modal after 2 seconds (for better UX)
      }, 2000);
    } catch (err) {
      console.error('Error creating forum:', err);
      setStatus('error');
      setError('Failed to create forum. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">Create a Forum</h2>

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium">Forum Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition duration-300"
              required
              placeholder="Enter forum title"
            />
          </div>

          {/* Predefined Tags */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium">Select Tags</label>
            <div className="flex flex-wrap gap-3 mt-3">
              {predefinedTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className={`px-5 py-3 text-sm rounded-full transition-all duration-300 transform ${
                    tags.includes(tag)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-purple-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Tag Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium">Add Custom Tag</label>
            <form className="flex items-center mt-3">
              <input
                type="text"
                value={userTag}
                onChange={(e) => setUserTag(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 transition duration-300"
                placeholder="Enter custom tag"
              />
              <button
                type="submit"
                onClick={handleUserTagAdd}
                className="ml-3 bg-purple-600 text-white px-5 py-3 rounded-r-lg hover:bg-purple-700 transition duration-300"
              >
                Add
              </button>
            </form>
          </div>

          {/* Display Selected Tags */}
          {tags.length > 0 && (
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium">Selected Tags</label>
              <div className="flex flex-wrap gap-3 mt-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-5 py-3 text-sm bg-purple-100 text-purple-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status Message */}
          {status === 'loading' && (
            <div className="text-center text-purple-600">Creating forum... Please wait...</div>
          )}
          {status === 'error' && (
            <div className="text-center text-red-600">{error}</div>
          )}
          {status === 'success' && (
            <div className="text-center text-green-600">Forum created successfully!</div>
          )}

          {/* Modal Buttons */}
          <div className="flex justify-end gap-5 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              disabled={status === 'loading'}  // Disable button while loading
            >
              Create Forum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForumCreateModal;
