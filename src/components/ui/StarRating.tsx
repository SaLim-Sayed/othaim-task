import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number; // 0–5 scale
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, className }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxStars }, (_, index) => {
        if (index < fullStars) {
          return <FaStar key={index} className="text-yellow-400" />;
        } else if (index === fullStars && hasHalfStar) {
          return <FaStarHalfAlt key={index} className="text-yellow-400" />;
        } else {
          return <FaRegStar key={index} className="text-gray-300" />;
        }
      })}
    </div>
  );
};

export default StarRating;
