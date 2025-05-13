import { useEffect, useState } from "react";

const Example = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then(setPosts)
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    console.log("posts: ", posts);

    return loading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <div>{posts.map((post) => <p key={post.id}>{post.title}</p>)}</div>
        </div>
    );
};

export default Example;