import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from "../css/modules/MyFormData.module.css";

import { useState } from "react";

export default function MyFormData() {
    const initialFormData = {
        title_post: "",
        content_post: "",
        img_post: "",
        category_post: "",
        tags_post: []
    };

    const [postsList, setPostsList] = useState([]);
    const [formData, setFormData] = useState(initialFormData);

    function updateFormData(newValue, fieldName) {
        setFormData({
            ...formData,
            [fieldName]: newValue
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        setPostsList([...postsList, { ...formData, id: crypto.randomUUID() }]);

        setFormData(initialFormData);
    }

    function removePost(idToRemove) {
        setPostsList(postsList.filter((post) => post.id !== idToRemove));
    }

    function handleTagsPostChange(e) {
        // recupero il valore del checkbox
        const value = e.target.value;

        // recupero lo stato della checkbox
        const checked = e.target.checked;

        let tagsPost = [...formData.tags_post];

        if (checked) {
            tagsPost.push(value);
        } else {
            tagsPost = tagsPost.filter((tag) => tag !== value);
        }

        updateFormData(tagsPost, 'tags_post');
    }

    return (

        <div className={style.container_fluid_mod}>
            <h1 className="text-center text-light"><strong>CREA POST</strong></h1>

            <div className={style.my_form}>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label htmlFor="titlePost" className="form-label">
                            <FontAwesomeIcon icon="fa-solid fa-tornado" />
                            <strong> Titolo:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Inserisci qui il titolo del post"
                            name="title_post"
                            value={formData.title_post}
                            onChange={(e) => updateFormData(e.target.value, "title_post")}
                        ></input>

                        <label htmlFor="imgPost" className="form-label">
                            <FontAwesomeIcon icon="fa-solid fa-image" />
                            <strong> URL Immagine:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Inserisci l'URL dell'immagine"
                            name="img_post"
                            value={formData.img_post}
                            onChange={(e) => updateFormData(e.target.value, "img_post")}
                        ></input>

                        <label htmlFor="contentPost" className="form-label">
                            <FontAwesomeIcon icon="fa-solid fa-box-open" />
                            <strong> Contenuto:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Inserisci qui il contenuto del post"
                            name="content_post"
                            value={formData.content_post}
                            onChange={(e) => updateFormData(e.target.value, "content_post")}
                        ></input>
                    </div>

                    <div>
                        <label htmlFor="categoryPost" className="form-label">
                            <FontAwesomeIcon icon="fa-solid fa-certificate" />
                            <strong> Categoria:</strong>
                        </label><br />
                        <select value={formData.category_post} onChange={(e) => updateFormData(e.target.value, 'category_post')}>
                            <option value="">--Seleziona la categoria--</option>
                            <option value="Nature Notes" /*selected={formData.category_post === 'nature_notes'}*/>Nature Notes</option>
                            <option value="Travel Tidbits" /*selected={formData.category_post === 'travel_tidbits'}*/>Travel Tidbits</option>
                            <option value="Nature's Palette" /*selected={formData.category_post === 'natures_palette'}*/>Nature's Palette</option>
                            <option value="Wayfaring Waves" /*selected={formData.category_post === 'wayfaring_waves'}*/>Wayfaring Waves</option>
                            <option value="Nomad Notes" /*selected={formData.category_post === 'nomad_notes'}*/>Nomad Notes</option>
                            <option value="Sound Bites" /*selected={formData.category_post === 'sound_bites'}*/>Sound Bites</option>
                        </select>
                    </div>

                    <label htmlFor="tagsPost" className="form-label py-2">
                        <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                        <strong> Tags:</strong>
                    </label>
                    <div className='row'>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('LifeStyle')} value="LifeStyle" onChange={handleTagsPostChange} />#LifeStyle</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('MotivationMonday')} value="MotivationMonday" onChange={handleTagsPostChange} />#MotivationMonday</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('PicOfTheDay')} value="PicOfTheDay" onChange={handleTagsPostChange} />#PicOfTheDay</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('NaturePhotography')} value="NaturePhotography" onChange={handleTagsPostChange} />#NaturePhotography</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('AdventureTime')} value="AdventureTime" onChange={handleTagsPostChange} />#AdventureTime</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('MusicIsLife')} value="MusicIsLife" onChange={handleTagsPostChange} />#MusicIsLife</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('MusicInspiration')} value="MusicInspiration" onChange={handleTagsPostChange} />#MusicInspiration</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('VacationMode')} value="VacationMode" onChange={handleTagsPostChange} />#VacationMode</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('TravelPhotography')} value="TravelPhotography" onChange={handleTagsPostChange} />#TravelPhotography</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('DigitalWorld')} value="DigitalWorld" onChange={handleTagsPostChange} />#DigitalWorld</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('FilmFestival')} value="FilmFestival" onChange={handleTagsPostChange} />#FilmFestival</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('SocialMedia')} value="SocialMedia" onChange={handleTagsPostChange} />#SocialMedia</label>
                        <label htmlFor="" className="col-4"><input type="checkbox" checked={formData.tags_post.includes('TagsForLike')} value="TagsForLike" onChange={handleTagsPostChange} />#TagsForLike</label>
                    </div>

                    <div>
                        <button type="submit" className={`btn btn-primary my-4 ${style.btn_mod}`}>
                            Crea Post
                        </button>
                    </div>

                </form>
            </div>

            <div className={style.posts_list_container}>
                <div className={`row justify-content-center`}>
                    {postsList.map((post) => (
                        <div key={post.id} className={`col-5 mx-5 my-5 card ${style.mod_card}`}>

                            <img className={style.card_img} src={post.img_post} alt="Post" />

                            <div className={style.card_main}>
                                <div className={style.card_header}>

                                    <h3>{post.title_post}</h3>

                                    <button className={style.delete_button} onClick={() => removePost(post.id)}>
                                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    </button>

                                </div>

                                <p>{post.content_post}</p>

                                <div>
                                    <h5>Categoria:</h5>
                                    <span>{post.category_post}</span>
                                </div>

                                <div>
                                    <h5>Tag:</h5>
                                    {post.tags_post.map((tag, index) => (
                                        <span key={index}>#{tag} </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>

        </div>
    );
}
