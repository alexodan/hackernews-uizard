export default async function StoryPage({
  params,
}: {
  params: { story: string }
}) {
  const storyDetails = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${params.story}.json?print=pretty`
  ).then((res) => res.json())

  return (
    <iframe
      className="w-full"
      src={storyDetails.url}
      title={storyDetails.title}
    ></iframe>
  )
}
