import React, { useState } from 'react';

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


const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData=>(
    {
        ...formData,
        [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises :', formData);
  };

  return (
    <div className="Formulaire">
      <h1>Formulaire d'enregistrement</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
        </label>
        <br />
        <label>
          Prénom:
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mail:
          <input type="email" name="mail" value={formData.mail} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date de Naissance:
          <input
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ville:
          <input type="text" name="ville" value={formData.ville} onChange={handleChange} />
        </label>
        <br />
        <label>
          Code Postal:
          <input
            type="text"
            name="codePostal"
            value={formData.codePostal}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">S'enregistrer</button>
      </form>
    </div>
  );
  }

  export default Formulaire;