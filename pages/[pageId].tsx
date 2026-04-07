import { type GetStaticProps } from 'next'

import { NotionPage } from '@/components/NotionPage'
import { domain, isDev, pageUrlOverrides } from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { type PageProps, type Params } from '@/lib/types'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const rawPageId = context.params?.pageId as string

  try {
    const props = await resolveNotionPage(domain, rawPageId)

    return { props, revalidate: 60 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  // 开发环境保持原有行为，方便调试
  if (isDev) {
    return {
      paths: [],
      fallback: 'blocking'
    }
  }

  // 生产环境：不再预先生成任何页面路径，全部按需生成（ISR）
  // 这样可以避免构建时触发 Notion API 的 429 速率限制
  return {
    paths: [],           // 关键：空数组，构建时不生成任何页面
    fallback: 'blocking' // 用户首次访问时实时生成页面，并缓存
  }
}

export default function NotionDomainDynamicPage(props: PageProps) {
  return <NotionPage {...props} />
}
