import useEchoState from "../../DataHandler/hooks/client/useEchoState";

const Post = () => {
    const { state: blog, setState: setBlog } = useEchoState<{
        id: string
        name: string
    }>('blog',)
    const { state: post, setState: setPost } = useEchoState<{
        id: string
        name: string
    }>('post')

    return (
        <div>
            <h3>Post</h3>
            <p>Blog: {blog?.name}</p>
            <p>Post: {post?.name}</p>

            <button onClick={() => setBlog({ id: 'blog-id', name: 'blog-name-from-post-page' })}>
                Set Blog
            </button>
            <button
                onClick={() =>
                    setPost(prev => {
                        return { ...prev, id: 'post-id', name: 'post-name-from-post-page' }
                    })
                }
            >
                Set Post
            </button>
        </div>
    )
};

export default Post;
