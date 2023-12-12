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

    const [formData, setFormData] = useState(initialFormData);
    const [formVisible, setFormVisible] = useState(false); // Stato per gestire la visibilità del form
    const [categoriesList, setCategoriesList] = useState([]);
    const [tagsList, setTagsList] = useState([]);


    async function handleFormSubmit(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/posts", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
    }

    function handleInputChange(e, key) {
        const { value, checked, type } = e.target;

        if (key === "tags") {
            // Se la chiave è "tags", gestisco l'array di tag
            setFormData(prev => {
                const currentTags = checked
                    ? [...prev.tags, value]  // Aggiungo il tag se è stato selezionato
                    : prev.tags.filter(tag => tag !== value);  // Rimuovo il tag se è stato deselezionato

                // Restituisco il nuovo stato
                return {
                    ...prev,
                    [key]: currentTags
                };
            });
        } else if (key === "category") {
            // Se la chiave è "category", gestisco la categoria
            setFormData(prev => {
                // Restituisco il nuovo stato con la nuova categoria
                return {
                    ...prev,
                    [key]: value
                };
            });
        } else {
            // Se la chiave non è né "tags" né "category", gestisco normalmente
            setFormData(prev => {
                return {
                    ...prev,
                    [key]: type === "checkbox" ? checked : value
                };
            });
        }
    }


    async function fetchCategories() {
        const categories = await (await fetch("http://localhost:3000/categories")).json();
        setCategoriesList(categories);
    }

    async function fetchTags() {
        const tags = await (await fetch("http://localhost:3000/tags")).json();

        setTagsList(tags);
    }

    // invoco la funzione fetch alla "creazione" del componente
    useEffect(() => {
        fetchCategories();
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
                    <form onSubmit={handleFormSubmit} id='postForm'>

                        <div className="mb-3 mt-3">
                            <div>
                                <label htmlFor="title" className="form-label">
                                    <FontAwesomeIcon icon="fa-solid fa-tornado" />
                                    <strong> Titolo:</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Inserisci qui il titolo del post"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange(e, "title")}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="img" className="form-label">
                                    <FontAwesomeIcon icon="fa-solid fa-image" />
                                    <strong> URL Immagine:</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Inserisci l'URL dell'immagine"
                                    id="img"
                                    name="img"
                                    value={formData.image}
                                    onChange={(e) => handleInputChange(e, "image")}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="content" className="form-label">
                                    <FontAwesomeIcon icon="fa-solid fa-box-open" />
                                    <strong> Contenuto:</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Inserisci qui il contenuto del post"
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={(e) => handleInputChange(e, "content")}
                                ></input>
                            </div>

                            <div>
                                <label htmlFor="category" className="form-label">
                                    <FontAwesomeIcon icon="fa-solid fa-certificate" />
                                    <strong> Categoria:</strong>
                                </label><br />
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) => handleInputChange(e, "category")}
                                >
                                    <option value="">Seleziona una categoria</option>
                                    {categoriesList.map(category => (
                                        <option
                                            key={category.id}
                                            value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="tags" className="form-label">
                                    <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                                    <strong> Tags:</strong>
                                </label>
                                <div className="row">
                                    {tagsList.map(tag => {
                                        return <div key={tag.id} className="col-3">
                                            <label key={tag.id}>
                                                {tag.name}

                                                <input
                                                    type="checkbox"
                                                    id="tags"
                                                    name="tags"
                                                    value={tag.id}
                                                    onChange={(e) => handleInputChange(e, "tags")}
                                                ></input>
                                            </label>
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="published">
                                    <FontAwesomeIcon icon="fa-solid fa-clipboard-check" /><strong> Pubblica</strong>
                                </label>

                                <input
                                    type="checkbox"
                                    value={formData.published}
                                    id="published"
                                    name="published"
                                    onChange={(e) => handleInputChange(e, "published")} />
                            </div>
                        </div>

                        <div className='d-flex'>
                            <button type="submit" className={`btn btn-primary my-4 ${style.btn_mod}`} form='postForm'>
                                Crea Post
                            </button>
                        </div>

                    </form>
                )}
            </div>

        </div>
    );
}
