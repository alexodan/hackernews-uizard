import { Suspense } from 'react'
import './globals.css'
import Link from 'next/link'

const TOP_STORIES_URL =
  'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'

export type Story = {
  by: string
  descendants: number
  id: number
  score: number
  time: number
  title: string
  type: string
  url: string
}

function LoadingItem() {
  return (
    <div role="status" className="w-full h-16 animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
    </div>
  )
}

async function ListItem({ id }: { id: number }) {
  const story = (await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  ).then((res) => res.json())) as Story

  return (
    <div className="p-4 shadow-inner dark:shadow-[#323232]">
      <h1 className="text-bold whitespace-nowrap text-ellipsis overflow-hidden mb-2">
        {story.title}
      </h1>
      <div className="flex justify-between">
        <p className="text-sm">Posted by {story.by}</p>
        <Link className="text-sm" href={`/${story.id}`}>
          Visit website &gt;&gt;
        </Link>
      </div>
    </div>
  )
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const storyIds = (await fetch(TOP_STORIES_URL).then((res) =>
    res.json()
  )) as Array<number>
  const topTenStories = storyIds.slice(0, 10)

  return (
    <html lang="en">
      <body>
        <header>
          <h1 className="text-3xl mb-12 text-center mt-8">
            Uizard Hackernews Reader
          </h1>
        </header>
        <section className="flex">
          <ul className="flex-initial w-80">
            {topTenStories.map((storyId) => (
              <li key={storyId}>
                <Suspense fallback={<LoadingItem />}>
                  <ListItem id={storyId} />
                </Suspense>
              </li>
            ))}
          </ul>
          {children}
        </section>
      </body>
    </html>
  )
}
