import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { client } from "@/utils/genqlClient"

export default function Create() {
    const router = useRouter()
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ url, setUrl ] = useState("")
    const [imageUrl, setImageUrl ] = useState("")

    const [ error, setError ] = useState("")

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        await client.mutation({
            createItem: {
                __args: {
                    title,
                    description,
                    url,
                    imageUrl,
                },
                id: true
            }
        }).then((response) => {
            console.log(response)
            router.push('/')
        }).catch((err) => {
            setError(err.message)
        })
    }

    return (
        <div className="py-4 px-6 max-w-xl">
            {error && <pre>{error}</pre>}
            <Link href="/">
                <button className="rounded bg-blue-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline disabled:bg-gray-400">&#8592; Back</button>
            </Link>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                    <h2 className="text-slate-950 text-3xl py-1 md:py-4 font-semibold">Create Wishlist Item</h2>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus-within:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus-within:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                            name="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus-within:outline-none"
                            />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            name="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus-within:outline-none"
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <button type="submit" disabled={title === ""} className="rounded bg-blue-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline disabled:bg-gray-400">Create Item</button>
                    </div>
                </div>
            </form>
        </div>
    )
}