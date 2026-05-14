import { useState } from "react";
import { Post } from "../../types";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: Post;
  onSelect: (post: Post) => void;
}

const PostCard = ({ post, onSelect }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${post.username}`}
          alt={post.username}
          className={styles.avatar}
        />
        <span className={styles.username}>{post.username}</span>
      </div>

      <div className={styles.imageContainer}>
        <img
          src={post.imageUrl}
          alt={post.caption}
          className={styles.image}
          onClick={() => onSelect(post)}
        />
      </div>

      <div className={styles.actions}>
        <div className={styles.leftActions}>
          <button onClick={handleLike} className={styles.actionBtn}>
            {liked ? "❤️" : "🤍"}
          </button>
          <button className={styles.actionBtn} onClick={() => onSelect(post)}>
            💬
          </button>
        </div>
        <button className={styles.actionBtn}>🔖</button>
      </div>

      <div className={styles.info}>
        <span className={styles.likes}>{likes} me gusta</span>
        <p className={styles.caption}>
          <strong>{post.username}</strong> {post.caption}
        </p>
        <span className={styles.date}>{post.date}</span>
      </div>
    </article>
  );
};

export default PostCard;