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
      <h1 className="text-4xl font-bold underline m-6">Wishlist Website</h1>
      {error && <p>Oops, something went wrong!</p>}
      <ul className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 m-6">
        {data?.getItems && data.getItems.map((item) => {
          if (!item) return 
          const listItem = <li key={item.id} className="p-4 border-2 rounded-md border-blue-200">
            <Link href={`/item/${item.id}`}>
              {item.imageUrl ?
                <img src={item.imageUrl} /> :
                <img src="https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg" />
              }
              <h2 className="text-slate-950 text-2xl font-medium py-1 md:py-4">{item.title}</h2>
              <p className="text-slate-700">{item.description ? item.description : "No item description available"}</p>
              <p className="text-slate-700">Added At: {new Date(item.createdAt).toDateString()}</p>
            </Link>
          </li>
          return listItem
        }
        )}
      </ul>
    </div>
  )
}