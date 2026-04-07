import { LikeIcon } from '@/lib/icons/like'
import { RetweetIcon } from '@/lib/icons/retweet'

import styles from './styles.module.css'

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview
 */
export function PageActions({ tweet }: { tweet: string }) {
  return (
    <div className={styles.pageActions}>
      <a
        href='#'
      >
      </a>
    </div>
  )
}
