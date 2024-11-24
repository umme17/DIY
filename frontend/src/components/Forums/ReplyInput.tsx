import React from "react";

interface ReplyInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ReplyInput: React.FC<ReplyInputProps> = ({ value, onChange, onSubmit, onCancel }) => {
  return (
    <div className="mt-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg"
        placeholder="Write a reply..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <div className="flex justify-end mt-2 space-x-2">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-md"
          onClick={onSubmit}
        >
          Post Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;
