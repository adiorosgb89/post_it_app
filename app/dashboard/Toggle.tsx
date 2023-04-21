"use client";

interface Props {
  deletePost(e: React.MouseEvent<HTMLButtonElement>): void;
  closeModal(toggle: boolean): void;
}
export default function Toggle({ deletePost, closeModal }: Props) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal(false);
      }}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <div className="flex flex-col mb-6">
          <h2 className="text-xl mb-2">
            Are you sure you want to delete this post?
          </h2>
          <h3 className="text-gray-400 text-xs ">
            Pressing the delete button will permenantly delete your post.
          </h3>
        </div>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={deletePost}
            className="bg-red-600 text-sm w-32 text-white py-2 px-4 rounded-md"
          >
            Delete post
          </button>
          <button
            className="bg-gray-600 text-sm w-32 text-white py-2 px-4 rounded-md"
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
