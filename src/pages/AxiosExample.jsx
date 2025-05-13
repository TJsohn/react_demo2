import axios from "axios";
import { useEffect, useState } from "react";

const AxiosExample = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => setPosts(res.data))
        .catch((error) => console.log("Axios error", error))
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

export default AxiosExample;