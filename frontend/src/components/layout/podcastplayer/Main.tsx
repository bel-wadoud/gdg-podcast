import React from 'react';

type Episode = {
    title: string;
    subtitle: string;
    category: string;
    publishedAt: string;
    guest: string;
    number: number;
    duration: string;
    description: string;
};

declare global {
    interface Window {
        EPISODE?: Episode;
    }
}

function Main() {
 return (
    <>
        <div className="grid grid-cols-2 grid-rows-4 gap-x-[50px] gap-y-[35px] w-full h-full">
            <div className="row-start-1 row-end-3 col-start-1 col-end-2 rounded-2xl shadow-md">
                {/* video player  */}
                <div className="p-4 h-full flex items-center justify-center">
                    <div className="w-full">
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-sm"
                                src="https://www.youtube.com/watch?v=ID-video"
                                title="Podcast video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#F5F5F5] row-start-3 row-end-5 col-start-1 col-end-2 rounded-2xl shadow-md">
                {/* description */}
                {(() => {
                    const defaultEpisode = {
                        title: 'Episode 42 — Building Faster Apps',
                        subtitle: 'A deep dive into performance, tooling and measurable wins',
                        category: 'Performance',
                        publishedAt: '2025-03-12',
                        guest: 'Jane Doe — Senior Frontend Engineer',
                        number: 42,
                        duration: '1h 08m',
                        description:
                            'In this episode Jane explains practical approaches to shipping faster web apps: measuring real user metrics, prioritizing critical render paths, and simple tooling changes that produce big UX wins. Expect concrete examples and actionable advice you can apply today.',
                    };

                    // Provide a way to inject dynamic data (e.g. window.EPISODE) or fall back to defaults
                    const episode = (typeof window !== 'undefined' && (window as any).EPISODE) ?? defaultEpisode;

                    const publishedLabel = (() => {
                        try {
                            return new Date(episode.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                        } catch {
                            return episode.publishedAt;
                        }
                    })();

                    return (
                        <div className="p-6 h-full flex flex-col gap-4 overflow-auto">
                            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{episode.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{episode.subtitle}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Category: {episode.category}</span>
                                    <time className="text-xs text-gray-500">Published: {publishedLabel}</time>
                                </div>
                            </header>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                                <div>
                                    <dt className="font-medium text-gray-800">Guest</dt>
                                    <dd className="mt-1">{episode.guest}</dd>
                                </div>

                                <div>
                                    <dt className="font-medium text-gray-800">Episode</dt>
                                    <dd className="mt-1">{episode.number} • {episode.duration}</dd>
                                </div>

                                <div className="sm:col-span-2">
                                    <dt className="font-medium text-gray-800">Description</dt>
                                    <dd className="mt-1 text-gray-700 leading-relaxed">{episode.description}</dd>
                                </div>
                            </dl>
                        </div>
                    );
                })()}
            </div>
            <div className="bg-red-400 row-start-1 row-end-5 col-start-2 col-end-3 rounded-2xl shadow-md">
                {/* comments section */}
                {/* Comments */}
                <div className="p-6 h-full flex flex-col gap-4 overflow-auto bg-[#F5F5F5] rounded-2xl">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">Comments</h4>
                        <span className="text-sm text-gray-600">{/* count */}0 comments</span>
                    </div>

                    {/* Comments list + add comment UI implemented as an inline component so it can use hooks */}
                    {(() => {
                        type Comment = {
                            id: string;
                            username: string;
                            avatar?: string;
                            text: string;
                            createdAt: string;
                            loves: number;
                            loved?: boolean;
                        };

                        const randomId = () => Math.random().toString(36).slice(2, 9);

                        const initialComments: Comment[] = [
                            {
                                id: randomId(),
                                username: 'alice',
                                avatar: 'https://i.pravatar.cc/48?img=12',
                                text: 'Great episode — loved the performance tips!',
                                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
                                loves: 4,
                            },
                            {
                                id: randomId(),
                                username: 'bob_dev',
                                avatar: 'https://i.pravatar.cc/48?img=5',
                                text: 'Practical and actionable — bookmarked.',
                                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours
                                loves: 2,
                            },
                        ];

                        const timeAgo = (iso: string) => {
                            const diff = Date.now() - new Date(iso).getTime();
                            const mins = Math.floor(diff / 60000);
                            if (mins < 1) return 'just now';
                            if (mins < 60) return `${mins}m ago`;
                            const hrs = Math.floor(mins / 60);
                            if (hrs < 24) return `${hrs}h ago`;
                            const days = Math.floor(hrs / 24);
                            return `${days}d ago`;
                        };

                        const CommentsInner: React.FC = () => {
                            const [comments, setComments] = React.useState<Comment[]>(initialComments);
                            const [text, setText] = React.useState('');
                            const [submitting, setSubmitting] = React.useState(false);

                            const toggleLove = (id: string) => {
                                setComments((c) =>
                                    c.map((item) =>
                                        item.id === id
                                            ? { ...item, loved: !item.loved, loves: item.loved ? item.loves - 1 : item.loves + 1 }
                                            : item
                                    )
                                );
                            };

                            const submit = (e?: React.FormEvent) => {
                                e?.preventDefault();
                                if (!text.trim()) return;
                                setSubmitting(true);
                                const newComment: Comment = {
                                    id: randomId(),
                                    username: 'you',
                                    avatar: 'https://i.pravatar.cc/48?img=32',
                                    text: text.trim(),
                                    createdAt: new Date().toISOString(),
                                    loves: 0,
                                };
                                // simulate slight delay
                                setTimeout(() => {
                                    setComments((c) => [newComment, ...c]);
                                    setText('');
                                    setSubmitting(false);
                                }, 250);
                            };

                            return (
                                <>
                                    <div className="flex flex-col gap-3">
                                        <div className="text-sm text-gray-600">{comments.length} comment{comments.length !== 1 ? 's' : ''}</div>

                                        <ul className="flex flex-col gap-4">
                                            {comments.map((c) => (
                                                <li key={c.id} className="flex items-start gap-3">
                                                    <img
                                                        src={c.avatar}
                                                        alt={c.username}
                                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-medium text-gray-900">{c.username}</span>
                                                                <span className="text-xs text-gray-500">• {timeAgo(c.createdAt)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => toggleLove(c.id)}
                                                                    aria-label="Love comment"
                                                                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full transition ${
                                                                        c.loved ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
                                                                    }`}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657 3.172 10.83a4 4 0 010-5.657z" />
                                                                    </svg>
                                                                    <span>{c.loves}</span>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{c.text}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <form onSubmit={submit} className="mt-4">
                                        <label htmlFor="comment" className="sr-only">
                                            Add a comment
                                        </label>
                                        <div className="flex items-end gap-2">
                                            <textarea
                                                id="comment"
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                placeholder="Add a comment..."
                                                className="flex-1 resize-none min-h-[56px] max-h-32 p-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!text.trim() || submitting}
                                                className="p-3 rounded-full bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                                aria-label="Send comment"
                                            >
                                                {/* Telegram / paper-plane icon */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M22 2l-7 20 1-9 9-9-9 9" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </>
                            );
                        };

                        return <CommentsInner />;
                    })()}
                </div>
            </div>
        </div>
    </>
 )
}

export default Main;

// make it resposive guys (_:
// make the video player works