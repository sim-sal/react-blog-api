import { useEffect } from "react";
import { useState } from "react";
import style from "../css/modules/PostsList.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let initialFetchDone = false;

export default function PostsList() {

    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        const data = await (await fetch('http://localhost:3000/posts/')).json();

        setPosts(data);
    }

    useEffect(() => {
        if (!initialFetchDone) {
            initialFetchDone = true;
            fetchPosts();
        }
    }, []);

    return (
        <div className={style.posts_list_container}>
            <div className={`row justify-content-center`}>
                {posts.map((post) => (
                    <div key={post.id} className={`col-5 mx-5 my-5 card ${style.mod_card}`}>

                        <img className={style.card_img} src={post.image ? post.image : "/image_not_found.jpg"} alt="Post" />

                        <div className={style.card_main}>
                            <div className={style.card_header}>

                                <h3>{post.title}</h3>

                                <button className={style.delete_button} onClick={() => removePost(post.id)}>
                                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                                </button>

                            </div>

                            <p>{post.content ? post.content : "Contenuto non disponibile"}</p>

                            <div>
                                <h5>Categoria:</h5>
                                <span>{post.category ? post.category.name : "Categoria non disponibile"}</span>
                            </div>

                            <div>
                                <h5>Tag:</h5>
                                {post.tags ? (
                                    post.tags.map((tag, index) => (
                                        <span key={index}>#{tag.name} </span>
                                    ))
                                ) : (
                                    <span>Tags non disponibili</span>
                                )}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}