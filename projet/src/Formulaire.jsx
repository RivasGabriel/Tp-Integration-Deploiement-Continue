import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function calculateAge(p)
{
  let dateDiff = new Date(Date.now() - p.birth.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  return age;

}

function Formulaire () {
    const [formData, setFormData] = useState(
        {
            name :'',
            firstname :'',
            email :'',
            birth :'',
            city :'',
            cp :''
        }
    );

    const IsValid = () =>
    {
      return formData.name.trim() !== '' &&
             formData.firstname.trim() !== '' &&
             formData.email.trim() !== '' &&
             formData.birth.trim() !== '' &&
             formData.city.trim() !== '' &&
             formData.cp.trim() !== '';
    };

  
    const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData=>(
    {
        ...prevData,
        [name]: value,
    }));
  };

   const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    let isErrors = false;  

    const regexName = /^[a-zA-ZÀ-ÿ-]+(?:\s[a-zA-ZÀ-ÿ-]+)*$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    const regexCodePostal = /^[0-9]{5}$/;

    if (!regexName.test(formData.name)) {
      toast.error("Nom n'est pas valide.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.nom = "Nom n'est pas valide.";
      isErrors = true;
    }
    //vérification de la validité du prenom avec un regex
    if (!regexName.test(formData.firstname)) {
      toast.error("Prenom n'est pas valide.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.prenom = "Prenom n'est pas valide.";
      isErrors = true;
    }

    if (!regexEmail.test(formData.email)) {
      toast.error("L'email n'est pas valide.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.email = "L'email n'est pas valide.";
      isErrors = true;
    }

    if (calculateAge({ birth: new Date(formData.birth) }) < 18) {
      toast.error('Vous devez avoir plus de 18 ans !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.dateNaissance = "Vous devez avoir plus de 18 ans !";
      isErrors = true;
    }

    if (!regexName.test(formData.city)) {
      toast.error("Ville n'est pas valide.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.ville = "Ville n'est pas valide.";
      isErrors = true;
    }

    if (!regexCodePostal.test(formData.cp)) {
      toast.error('Le code postal doit contenir 5 chiffres.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      formErrors.codePostal = "Le code postal doit contenir 5 chiffres.";
      isErrors = true;
    }
    if (isErrors) {
      setErrors(formErrors);
      return;
    }
    console.log(formData);
    localStorage.setItem('userData', JSON.stringify(formData));

    // Affichage du toast de succès
    toast.success('Inscription réussie !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

     // Réinitialisation des champs du formulaire
     setFormData({
      name :'',
      firstname :'',
      email :'',
      birth :'',
      city :'',
      cp :''
    });
    
  };

  return (
    <div className="Formulaire">
      <h1>Formulaire d'enregistrement</h1>
      <form onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input
                        type="text"
                        data-testid="test_name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </label>
                {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
                <br />
                <label>
                    Prénom:
                    <input
                        type="text"
                        data-testid="test_firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                </label>
                {errors.firstname && <div style={{color: 'red'}}>{errors.firstname}</div>}

                <br />
                <label>
                    Mail:
                    <input
                        type="email"
                        name="email"
                        data-testid="test_email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </label>
                {errors.email && <div style={{color: 'red'}}>{errors.email}</div>}

                <br />
                <label>
                    Date de Naissance:
                    <input
                        type="date"
                        name="birth"
                        data-testid="test_birth"
                        value={formData.birth}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Ville:
                    <input
                        type="text"
                        name="city"
                        data-testid="test_city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                    />
                </label>
                {errors.city && <div style={{color: 'red'}}>{errors.city}</div>}

                <br />
                <label>
                    Code Postal:
                    <input
                        type="text"
                        name="cp"
                        data-testid="test_cp"
                        value={formData.cp}
                        onChange={handleChange}
                        placeholder="Postal Code"
                        required
                    />
                </label>
                {errors.cp && <div style={{color: 'red'}}>{errors.cp}</div>}

                <br />
                <button disabled={!IsValid()} type="submit" data-testid="test_button">
                    S'enregistrer
                </button>
            </form>
    </div>
  );
  }

  export default Formulaire;