'use client'

interface Props {
    searchInput: string
    setSearchInput: (val: string) => void
    onSearch: () => void
    onRefresh: () => void
    loading: boolean
}

export default function ImageControls({
    searchInput,
    setSearchInput,
    onSearch,
    onRefresh,
    loading,
}: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch()
    }

    return (
        <div className="sticky top-0 p-4 bg-black shadow-md z-50 flex items-center justify-between gap-4">
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 flex-grow"
            >
                <input
                    type="text"
                    placeholder="Search hashtag (e.g. cats)"
                    className="flex-grow px-3 py-2 border rounded bg-white text-black"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    Search
                </button>
            </form>

            <div className="flex-shrink-0 flex items-center justify-center">
                <button
                    onClick={onRefresh}
                    disabled={loading}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500 cursor-pointer"
                >
                    {loading ? 'Loading...' : 'Shuffle'}
                </button>
            </div>
        </div>
    )
}
