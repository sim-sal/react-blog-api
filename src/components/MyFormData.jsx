import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from "../css/modules/MyFormData.module.css";

import { useEffect, useState } from "react";

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
    const [tagsList, setTagsList] = useState([]);


    function handleFormSubmit(e) {
        e.preventDefault();

        setPostsList([...postsList, { ...formData, id: crypto.randomUUID() }]);

        setFormData(initialFormData);
    }

    function handleInputChange(e, key) {
        const { value, checked, type } = e.target;

        if (key === "tags") {
            // Se la chiave è "tags", gestisci l'array di tag
            setFormData(prev => {
                let currentTags = [...prev.tags]; // Crea una copia dell'array esistente

                if (checked) {
                    // Aggiungi il tag se è stato selezionato
                    currentTags.push(value);
                } else {
                    // Rimuovi il tag se è stato deselezionato
                    currentTags = currentTags.filter(tag => tag !== value);
                }

                // Restituisci il nuovo stato
                return {
                    ...prev,
                    [key]: currentTags
                };
            });
        } else {
            // Se la chiave non è "tags", gestisci normalmente
            setFormData(prev => {
                return {
                    ...prev,
                    [key]: type === "checkbox" ? checked : value
                };
            });
        }
    }

    async function fetchTags() {
        const tags = await (await fetch("http://localhost:3000/tags")).json();

        setTagsList(tags);
    }

    // invoco la funzione fetch alla "creazione" del componente
    useEffect(() => {
        fetchTags();
    }, []);

    return (

        <div className={style.container_fluid_mod}>

            <div className={style.my_form}>

                <div>
                    <button
                        className={`btn btn-primary ${style.fab_button}`}
                        onClick={() => setFormVisible(!formVisible)}
                    >
                        <FontAwesomeIcon icon={formVisible ? "fa-solid fa-times" : "fa-solid fa-pen"} />
                    </button>

                    <h1 className="text-light"><strong>CREA NUOVO POST</strong></h1>
                </div>

                {formVisible && (  // Mostro il form solo se formVisible è true
                    <form onSubmit={handleFormSubmit}>

                        <div className="mb-3 mt-3">
                            <div>
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
                            </div>

                            <div>
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
                            </div>

                            <div>
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
                            </div>

                            <div>
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
                            </div>

                            <div>
                                <label htmlFor="tagsPost" className="form-label">
                                    <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                                    <strong> Tags:</strong>
                                </label>
                                <div className="row">
                                    {tagsList.map(tag => {
                                        return <div className="col-3">
                                            <label key={tag.id}>
                                                {tag.name}

                                                <input
                                                    type="checkbox"
                                                    name="tags_input"
                                                    value={tag.id}
                                                    onChange={(e) => handleInputChange(e, "tags")}
                                                ></input>
                                            </label>
                                        </div>
                                    })}
                                </div>
                            </div>

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
