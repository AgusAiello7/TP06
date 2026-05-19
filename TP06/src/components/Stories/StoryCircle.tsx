import styles from './Stories.module.css'

interface StoryCircleProps {
  username: string
  imageUrl: string
}

const StoryCircle = ({ username, imageUrl }: StoryCircleProps) => {
  return (
    <div className={styles.storyCircle}>
      <div className={styles.ring}>
        <img src={imageUrl} alt={username} className={styles.storyImage} />
      </div>
      <span className={styles.storyUsername}>@{username}</span>
    </div>
  )
}

export default StoryCircle
