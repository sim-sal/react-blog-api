import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from "../css/modules/MyFormData.module.css";

import { useState } from "react";

const initialFormData = {
    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: false
};

export default function MyFormData() {

    const [postsList, setPostsList] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [formVisible, setFormVisible] = useState(false); // Stato per gestire la visibilità del form


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

    function handleInputChange(e, key) {
        // recupero i value
        const value = e.target.value;

        // recupero lo stato della checkbox
        const checked = e.target.checked;

        // prendo i valori attuali + quelli nuovi
        setFormData(prev => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    return (

        <div className={style.container_fluid_mod}>

            <div className={style.my_form}>
                <button
                    className={`btn btn-primary ${style.fab_button}`}
                    onClick={() => setFormVisible(!formVisible)}
                >
                    <FontAwesomeIcon icon={formVisible ? "fa-solid fa-times" : "fa-solid fa-pen"} />
                </button>

                <h1 className="text-center text-light"><strong>CREA NUOVO POST</strong></h1>

                {formVisible && (  // Mostro il form solo se formVisible è true
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
                                name="title_input"
                                value={formData.title}
                                onChange={(e) => handleInputChange(e, "title")}
                            ></input>

                            <label htmlFor="imgPost" className="form-label">
                                <FontAwesomeIcon icon="fa-solid fa-image" />
                                <strong> URL Immagine:</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Inserisci l'URL dell'immagine"
                                name="img_input"
                                value={formData.image}
                                onChange={(e) => handleInputChange(e, "image")}
                            ></input>

                            <label htmlFor="contentPost" className="form-label">
                                <FontAwesomeIcon icon="fa-solid fa-box-open" />
                                <strong> Contenuto:</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Inserisci qui il contenuto del post"
                                name="content_input"
                                value={formData.content}
                                onChange={(e) => handleInputChange(e, "content")}
                            ></input>

                            <label htmlFor="categoryPost" className="form-label">
                                <FontAwesomeIcon icon="fa-solid fa-certificate" />
                                <strong> Categoria:</strong>
                            </label><br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Inserisci la categoria"
                                name="category_input"
                                value={formData.category}
                                onChange={(e) => handleInputChange(e, "category")}
                            ></input>

                            <label htmlFor="tagsPost" className="form-label">
                                <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                                <strong> Tags:</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Inserisci i tags"
                                name="tags_input"
                                value={formData.tags}
                                onChange={(e) => handleInputChange(e, "tags")}
                            ></input>

                            <div className="mt-4">
                                <label htmlFor="publishedPost"><FontAwesomeIcon icon="fa-solid fa-clipboard-check" /><strong> Pubblica</strong></label>
                                <input type="checkbox" value={formData.published} id="publishedPost" onChange={(e) => handleInputChange(e, "published")} />
                            </div>
                        </div>

                        <div className='d-flex'>
                            <button type="submit" className={`btn btn-primary my-4 ${style.btn_mod}`}>
                                Crea Post
                            </button>
                        </div>

                    </form>
                )}
            </div>

        </div>
    );
}
