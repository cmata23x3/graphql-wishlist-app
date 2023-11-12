import { client } from "@/utils/genqlClient"
import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from "swr"

export default function Item() {
    const router = useRouter()
    const { id } = router.query

    const fetcher = async (id: string) => client.query({
        getOneItem:
            {
                __args: { id },
                id: true,
                title: true,
                description: true,
                imageUrl: true,
                url: true,
                createdAt: true,
            }
    })

    const { data, error } = useSWR(id, fetcher)

    return (
        <div className="py-4 px-6 max-w-xl">
            <Link href="/">
                <button className="rounded bg-blue-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline">&#8592; Back</button>
            </Link>
            {error && <p>Oops, something went wrong!</p>}
            {data?.getOneItem && (
                <div className="mx-auto grid grid-cols-1 gap-2 px-6 py-4">
                    <h1 className="text-slate-950 text-3xl font-medium py-1 md:py-4">{data.getOneItem.title}</h1>
                    {data.getOneItem.imageUrl ?
                        <img className="md:self-center" src={data.getOneItem.imageUrl} /> :
                        <img src="https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg" />
                    }
                    <div className="bg-gray-200 p-2 border-gray-50 rounded ring-1">
                        <p>{data.getOneItem.description}</p>
                        {data.getOneItem.url && (
                            <p>
                                <a className="underline hover:text-sky-600" href={data.getOneItem.url} target="_blank">Check out item</a>
                            </p>
                        )}
                        <div>
                            <em>Added at: {new Date(data.getOneItem.createdAt).toDateString()}</em>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
