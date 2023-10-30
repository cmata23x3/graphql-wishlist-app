import Link from "next/link"
import useSWR from "swr"
import { client } from "@/utils/genqlClient"


export default function Home() {
  const fetcher = () => client.query({
      getItems: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
      }
    })

  const { data, error } = useSWR('getItems', fetcher)

  return (
    <div>
      <h1>Wishlist Website</h1>
      {error && <p>Oops, something went wrong!</p>}
      <ul>
        {data?.getItems && data.getItems.map((item) => {
          if (!item) return 
          const listItem = <li key={item.id}>
            <Link href={`/item/${item.id}`}>
              {item.imageUrl ?
                <img src={item.imageUrl} height="640" width="640" /> :
                <img src="https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg" height="640" width="640" />
              }
              <h2>{item.title}</h2>
              <p>{item.description ? item.description : "No item description available"}</p>
              <p>Created At: {new Date(item.createdAt).toDateString()}</p>
            </Link>
          </li>
          return listItem
        }
        )}
      </ul>
    </div>
  )
}