import FavoriteIcon from "../images/favorite.svg";
import CommentIcon from "../images/comment.svg";

const InstaFeedItem = ({ mediaUrl, caption, permalink, likes, comments }) => {
  return (
    <div className="border rounded-lg shadow-md col-span-6 sm:col-span-4 md:col-span-4 relative group">
      <a href={permalink} target="_blank" rel="noopener noreferrer">
        <img src={mediaUrl} alt={caption} className="w-full h-auto rounded-md" />
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col justify-center items-center text-white px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <img src={FavoriteIcon} alt="Likes" className="w-6 h-6" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <img src={CommentIcon} alt="Comments" className="w-6 h-6" />
              <span>{comments}</span>
            </div>
          </div>
          <p className="text-sm text-center">{caption}</p>
        </div>
      </a>
    </div>
  );
};

export default InstaFeedItem;