import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditBook({ book, updateBook, handleClose }) {
  // console.log(handleClose);
  console.log(book.year);
  // Déclaration de l'état du composant: état du formulaire et des erreurs de saisie
  const [formData, setFormData] = useState({
    title: book.title ?? "",
    author: book.author ?? "",
    year: book.year ? new Date(book.year, 0, 1) : null,
    editable: false,
  });

  const [errors, setErrors] = useState({
    title: "",
    author: "",
    year: "",
  });

  // Déclarer la fonction de validation de formulaire
  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Le titre est requis";
    if (!formData.author) newErrors.author = "L'auteur est requis";
    if (!formData.year) newErrors.year = "L'année est requise";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // retourne false si l'objet newErrors contient des propriétés d'erreurs sinon true
  };

  // Déclaration des gestionnaires d'évenement
  const handleSubmit = (e) => {
    e.preventDefault(); // désactiver le chargement de page à la soumission de formulaire

    // Envoyer les données au serveur de l'API
    const updateBookFromAPI = async (bookToUpdate) => {
      const { _id, editable, ...payload } = bookToUpdate;

      try {
        const response = await fetch(
          `https://www.restapi.fr/api/books/${bookToUpdate._id}`,
          {
            method: "PUT", // mise à jour complète de la donnée distante
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          updateBook({
            ...book,
            title: formData.title,
            author: formData.author,
            year: formData.year,
            editable: false,
          });

          alert("Formulaire soumis");

          // Reset
          setFormData({
            title: "",
            author: "",
            year: "",
          });
        } else {
          console.log("Oops, une erreur");
          setErrors({
            ...errors,
            fetch: "Oops, une erreur",
          });
        }
      } catch (error) {
        console.log("Erreur", error);
        setErrors({
          ...errors,
          fetch: error.message,
        });
      }
    };

    // Récupérer les données
    // Valider et traiter les données avant envoi à l'API
    if (validate()) {
      // s'il n'y pas d'erreur, soumettre le formulaires
      updateBookFromAPI({
        ...book,
        title: formData.title,
        author: formData.author,
        year: new Date(formData.year).getFullYear(),
      });
      console.log("Données formulaire", formData);
    } else {
      return;
    }
  };

  const handleChangeTitle = (e) => {
    console.log("Valeur input titre : ", e.target.value);

    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const handleChangeAuthor = (e) => {
    console.log("Valeur input auteur : ", e.target.value);

    setFormData({ ...formData, author: e.target.value });
  };

  const handleChangeDatePicker = (date) => {
    setFormData({ ...formData, year: date });
    console.log("Valeur input année de sortie : ", formData.year);
  };

  // useEffect(() => {
  //   console.log(formData.year);
  // }, [formData.year]);

  const handleClickCancel = () => {
    handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-3"
      action="#"
      method="POST"
    >
      <div className="mb-4">
        <label className="form-label" htmlFor="title">
          Titre
        </label>
        <input
          onChange={handleChangeTitle}
          className="form-control"
          type="text"
          name="title"
          id="title"
          value={formData.title}
        />
        {errors?.title ? <i className="text-danger">{errors.title}</i> : ""}
      </div>
      <div className="mb-4">
        <label className="form-label" htmlFor="author">
          Auteur
        </label>
        <input
          onChange={handleChangeAuthor}
          className="form-control"
          type="text"
          name="author"
          id="author"
          minLength={3}
          value={formData.author}
        />
        {errors?.author ? <i className="text-danger">{errors.author}</i> : ""}
      </div>
      <div className="d-flex flex-column mb-4">
        <label className="form-label mb-2" htmlFor="year">
          Année de publication
        </label>
        <DatePicker
          id="year"
          onChange={(date) => handleChangeDatePicker(date)}
          selected={formData.year}
          showYearPicker
          dateFormat={"yyyy"}
        />
        {errors?.year ? <i className="text-danger">{errors.year}</i> : ""}
      </div>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-end">
          <input
            type="submit"
            className={`btn btn-primary mt-4 `}
            value={"Mettre à jour"}
          />
          <button
            onClick={handleClickCancel}
            type="button"
            className="btn btn-secondary text-white"
          >
            Annuler
          </button>
        </div>
        {errors?.fetch ? <i className="text-danger ">{errors.fetch}</i> : ""}
      </div>
    </form>
  );
}

export default EditBook;
