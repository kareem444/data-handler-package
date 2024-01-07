import useEchoState from '../../DataHandler/hooks/client/useEchoState'

const Blog = () => {
    const { state: blog, setState: setBlog } = useEchoState<{ id: string, name: string }>('blog', { id: 'blog-id', name: 'blog-name' })
    const { state: post, setState: setPost } = useEchoState<{
        id: string
        name: string
    }>('post')

    return (
        <div>
            <h3>Blog</h3>
            <p>Blog: {blog?.name}</p>
            <p>Post: {post?.name}</p>

            <button onClick={() => setBlog({ id: 'blog-id', name: 'blog-name-from-blog-page' })}>
                Set Blog
            </button>
            <button
                onClick={() =>
                    setPost(prev => {
                        return { ...prev, id: 'post-id', name: 'post-name-from-blog-page' }
                    })
                }
            >
                Set Post
            </button>
        </div>
    )
}

export default Blog
