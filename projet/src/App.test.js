import { render, screen } from '@testing-library/react';
import Formulaire from './Formulaire';
import { calculateAge } from './Formulaire.jsx';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';


//Le calcul de l'âge

describe('Age_calcul',() =>
{
  it('Age_Is_Working',()=>
  {
    const TestAgeValide =
    {
      date : new Date (13/12/2000)
    }
    expect(calculateAge(date)).toBe(new Date().getFullYear() - 1992);
  })
  it('Check if the calcul of the age is correct when age is > 18', async ()=>
  {
    render(<Formulaire/>);

  const InputTestBirth = screen.getByTestId('test_birth');
  fireEvent.change(InputTestBirth, { target: { value: '13/12/2000' } });

  const InputTestButton = screen.getByTestId('test_button');
  fireEvent.submit(InputTestButton);

  setTimeout(() => {
    const Message = screen.getByText('Vous avoir plus de 18 ans');
    expect(Message).toBeInTheDocument();
  }, 50); 
  })
})

//L'âge > 18 ans

describe('Age_Verification',() =>
{
  it('Return_Age',() =>
  {
    const Gratouille =
    {
      date : new Date (1/1/1992)
    }
    expect(calculateAge(Gratouille)).toBe(new Date().getFullYear() - 1992);
  })
  it('Check if age > 18', async () => 
  {
    render(<Formulaire/>);

  const InputTestBirth = screen.getByTestId('test_birth');
  fireEvent.change(InputTestBirth, { target: { value: '09/02/2022' } });

  const InputTestButton = screen.getByTestId('test_button');
  //const InputTestButton = screen.getByRole('test_button',{name: /S'enregistrer/i});
  fireEvent.submit(InputTestButton);
  //fireEvent.submit(InputTestButton);

  setTimeout(() => {
    const Message = screen.getByText('Vous devez avoir plus de 18 ans');
    expect(Message).toBeInTheDocument();
  }, 50); 
  });
});

//Le format du code postal
describe('CP_Verification', () => {
  it('Return_Wrong_CP', async () => {
    render(<Formulaire />);

    const InputTestCP = screen.getByTestId('test_cp');
    fireEvent.change(InputTestCP, { target: { value: '0110' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      const Message = screen.getByText('le cp doit contenir 5 chiffres');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });
  it('Return_Wrong_CP 2', async () => {
    render(<Formulaire />);

    const InputTestCP = screen.getByTestId('test_cp');
    fireEvent.change(InputTestCP, { target: { value: '012210' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {

      const Message = screen.getByText(' 5 chiffres pas 6 dude');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });
  it('Return_Good_CP ', async () => {
    render(<Formulaire />);

    const InputTestCP = screen.getByTestId('test_cp');
    fireEvent.change(InputTestCP, { target: { value: '01210' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {

      const Message = screen.getByText('its work');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });
}
);

//Le format des noms et prénoms (avec différents cas particulier)

//Le format de l’email
describe('Email_Verification', () => {
  it('Return_Wrong_Email', async () => {
    render(<Formulaire />);

    const InputTestEmail = screen.getByTestId('test_email');
    fireEvent.change(InputTestEmail, { target: { value: 'gab.AraAra@uwuSempaichan.' } })

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {

      const Message = screen.getByText('Email Invalide');
      expect(Message).not.toBeInTheDocument();
    }, 50); 

    });
  it('Return_Good_Email', async () => {
    render(<Formulaire />);

    const InputTestEmail = screen.getByTestId('test_email');
    fireEvent.change(InputTestEmail, { target: { value: 'gabriel.rivas@ynov.com' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      const Message = screen.getByText('Email Valide');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });
});

//La désactivation du bouton si les champs ne sont pas remplis
describe('Button_Desactivate', () => {
  it('Return_Button_Desactivate', async () => {
    render(<Formulaire />);

    const InputTestButton = screen.getByTestId('test_button');

    expect(InputTestButton).toBeDisabled();

  });
  describe('Bouton désactiver si un champ est vide', () => {

    let InputTestButton;

    let InputTestBirth;
    let InputTestCP ;
    let InputTestEmail;
    let InputTestName;
    let InputTestFirstname;
    let InputTestCity;
  
    beforeEach(() => {
      render(<Formulaire />);
       InputTestButton = screen.getByTestId('test_button');
  
       InputTestBirth = screen.getByTestId('test_birth');
       InputTestCP = screen.getByTestId('test_cp');
       InputTestEmail = screen.getByTestId('test_email');
       InputTestName = screen.getByTestId('test_name');
       InputTestFirstname = screen.getByTestId('test_firstname');
       InputTestCity = screen.getByTestId('test_city');

      fireEvent.change(InputTestBirth, { target: { value: '2000/02/02' } });
      fireEvent.change(InputTestCP, { target: { value: '01210' } });
      fireEvent.change(InputTestEmail, { target: { value: 'Baldurs@GateThree.ch' } });
      fireEvent.change(InputTestName, { target: { value: 'Never' } });
      fireEvent.change(InputTestFirstname, { target: { value: 'Give' } });
      fireEvent.change(InputTestCity, { target: { value: 'YouUp' } });
    });
  
    it('Descativate button cuz birth is empty', () => {
      fireEvent.change(InputTestBirth, { target: { value: '' } });
      expect(InputTestButton).toBeDisabled();
    });
    it('Descativate button cuz cp is empty', () => {
      fireEvent.change(InputTestCP, { target: { value: '' } });
      expect(InputTestButton).toBeDisabled();
    });
    it('Descativate button cuz email is empty', () => {
      fireEvent.change(InputTestEmail, { target: { value: '' } });
      expect(InputTestButton).toBeDisabled();
    });
    it('Descativate button cuz name is empty', () => {
      fireEvent.change(InputTestName, { target: { value: '' } });
      expect(InputTestButton).toBeDisabled();
    });
    it('Descativate button cuz firstname is empty', () => {
      fireEvent.change(InputTestFirstname, { target: { value: '' } });
      expect(InputTestButton).toBeDisabled();
    });
    it('Descativate button cuz city is empty', () => {
      fireEvent.change(InputTestCity, { target: { value: '' } });
      expect(InputTestButton).toBeDisabled();
    });
  });

  it('Bouton activé si tout les chamsp sont remplis', async () => {
    render(<Formulaire />);

    const InputTestButton = screen.getByTestId('test_button');

    InputTestButton = screen.getByTestId('test_button');
  
       InputTestBirth = screen.getByTestId('test_birth');
       InputTestCP = screen.getByTestId('test_cp');
       InputTestEmail = screen.getByTestId('test_email');
       InputTestName = screen.getByTestId('test_name');
       InputTestFirstname = screen.getByTestId('test_firstname');
       InputTestCity = screen.getByTestId('test_city');

      fireEvent.change(InputTestBirth, { target: { value: '2000/02/02' } });
      fireEvent.change(InputTestCP, { target: { value: '01210' } });
      fireEvent.change(InputTestEmail, { target: { value: 'PersonaThree@Reload.ee' } });
      fireEvent.change(InputTestName, { target: { value: 'Never' } });
      fireEvent.change(InputTestFirstname, { target: { value: 'Let' } });
      fireEvent.change(InputTestCity, { target: { value: 'YouDown' } });
    
    
    setTimeout(() => {
      expect(InputTestButton).toBeEnabled();
    }, 50); 
  });
});

//La sauvegarde dans le local storage et le toaster de succès, avec champs vidés
describe('SaveIn_Local_Storage_Empty_Field', () => {
  it('Sauvegarde dans le Local Storage', async () => {
    render(<Formulaire />);

      InputTestButton = screen.getByTestId('test_button');
  
       InputTestBirth = screen.getByTestId('test_birth');
       InputTestCP = screen.getByTestId('test_cp');
       InputTestEmail = screen.getByTestId('test_email');
       InputTestName = screen.getByTestId('test_name');
       InputTestFirstname = screen.getByTestId('test_firstname');
       InputTestCity = screen.getByTestId('test_city');

      fireEvent.change(InputTestBirth, { target: { value: '02/02/2000' } });
      fireEvent.change(InputTestCP, { target: { value: '01210' } });
      fireEvent.change(InputTestEmail, { target: { value: 'Dark@SoulsThree.nl' } });
      fireEvent.change(InputTestName, { target: { value: 'Never' } });
      fireEvent.change(InputTestFirstname, { target: { value: 'GonnaMake' } });
      fireEvent.change(InputTestCity, { target: { value: 'YouCry' } });

    fireEvent.click(screen.getByRole('test_button'));

    setTimeout(() => {
    const StorageUserData = JSON.parse(localStorage.getItem('userData'));
    expect(StorageUserData).toBeDefined();
    expect(StorageUserData.birth).toBe('02/02/2000');
    expect(StorageUserData.cp).toBe('01210');
    expect(StorageUserData.email).toBe('Dark@SoulsThree.nl');
    expect(StorageUserData.name).toBe('Never');
    expect(StorageUserData.firstname).toBe('GonnaMake');
    expect(StorageUserData.city).toBe('YouCry');
  
    }, 50); 
  });
  it('Toast Valide', async () => {
    render(<Formulaire />);

    InputTestBirth = screen.getByTestId('test_birth');
    InputTestCP = screen.getByTestId('test_cp');
    InputTestEmail = screen.getByTestId('test_email');
    InputTestName = screen.getByTestId('test_name');
    InputTestFirstname = screen.getByTestId('test_firstname');
    InputTestCity = screen.getByTestId('test_city');

   fireEvent.change(InputTestBirth, { target: { value: '02/02/2000' } });
   fireEvent.change(InputTestCP, { target: { value: '01210' } });
   fireEvent.change(InputTestEmail, { target: { value: 'Crusader@KingThree.lv' } });
   fireEvent.change(InputTestName, { target: { value: 'Never' } });
   fireEvent.change(InputTestFirstname, { target: { value: 'GonnaSay' } });
   fireEvent.change(InputTestCity, { target: { value: 'Goodbye' } }); 

    fireEvent.click(screen.getByTestId('button_test'));

    jest.mock('react-toastify', () => ({
      toast: {
        success: jest.fn(),
      },
    }));

    setTimeout(() => {     
      expect(toast.success).toHaveBeenCalled();      
    }, 50); 
  });
  it('Champ_Empty', async () => {
    render(<Formulaire />);

    InputTestBirth = screen.getByTestId('test_birth');
    InputTestCP = screen.getByTestId('test_cp');
    InputTestEmail = screen.getByTestId('test_email');
    InputTestName = screen.getByTestId('test_name');
    InputTestFirstname = screen.getByTestId('test_firstname');
    InputTestCity = screen.getByTestId('test_city');

   fireEvent.change(InputTestBirth, { target: { value: '02/02/2000' } });
   fireEvent.change(InputTestCP, { target: { value: '01210' } });
   fireEvent.change(InputTestEmail, { target: { value: 'Crusader@KingThree.lv' } });
   fireEvent.change(InputTestName, { target: { value: 'Never' } });
   fireEvent.change(InputTestFirstname, { target: { value: 'GonnaTellaLie' } });
   fireEvent.change(InputTestCity, { target: { value: 'AndHurtYou' } }); 

   fireEvent.click(screen.getByTestId('button_test'));

    setTimeout(() => {
      expect(screen.getByTestId('test_cp').value).toBe('');
    }, 50); 
  });
});

//Le toaster d’erreur et les erreurs correspondantes en rouge
describe('Erreur et toaster correspondant', () => {

  //Name
  it('ErrorName', async () => {
    render(<Formulaire />);

    const InputTestName = screen.getByTestId('test_name');
    fireEvent.change(InputTestName, { target: { value: '~(^3^)~' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {
      const Message = screen.getByText("Name Invalid");
      expect(Message).toBeInTheDocument();
    }, 50); 

    });
  it('ErrorNameToast', async () => {
    render(<Formulaire />);

    const InputTestName = screen.getByTestId('test_name');
    fireEvent.change(InputTestName, { target: { value: '~(o-o)~' } }); 

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      expect(toast.error).toHaveBeenCalledWith("NameInvalid.", expect.anything());
    }, 50); 
  });

  //Birth
  it('ErrorBirth', async () => {
    render(<Formulaire />);

    const InputTestBirth = screen.getByTestId('test_birth');
    fireEvent.change(InputTestBirth, { target: { value: '11/02/2024' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {
      const Message = screen.getByText("Birth Invalid");
      expect(Message).toBeInTheDocument();
    }, 50); 

    });
  it('ErrorBirthToast', async () => {
    render(<Formulaire />);

    const InputTestBirth = screen.getByTestId('test_birth');
    fireEvent.change(InputTestBirth, { target: { value: '~(Oo)~' } }); 

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      expect(toast.error).toHaveBeenCalledWith("BirthInvalid.", expect.anything());
    }, 50); 
  });

  //Cp
  it('ErrorCp', async () => {
    render(<Formulaire />);

    const InputTestCP = screen.getByTestId('test_cp');
    fireEvent.change(InputTestCP, { target: { value: '~(owo)~' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {
      const Message = screen.getByText("Cp Invalid");
      expect(Message).toBeInTheDocument();
    }, 50); 

    });

  it('ErrorCpToast', async () => {
    render(<Formulaire />);

    const InputTestName = screen.getByTestId('test_cp');
    fireEvent.change(InputTestName, { target: { value: '~(TwT)~' } }); 

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      expect(toast.error).toHaveBeenCalledWith("CpInvalid.", expect.anything());
    }, 50); 
  });

  //Email
  it('ErrorEmail', async () => {
    render(<Formulaire />);

    const InputTestEmail = screen.getByTestId('test_email');
    fireEvent.change(InputTestEmail, { target: { value: '~(u@u)~' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {
      const Message = screen.getByText("Email Invalid");
      expect(Message).toBeInTheDocument();
    }, 50); 

    });

  it('ErrorEmailToast', async () => {
    render(<Formulaire />);

    const InputTestEmail = screen.getByTestId('test_email');
    fireEvent.change(InputTestEmail, { target: { value: '~(-@-)~' } }); 

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      expect(toast.error).toHaveBeenCalledWith("EmailInvalid.", expect.anything());
    }, 50); 
  });

   //Name
   it('ErrorName', async () => {
    render(<Formulaire />);

    const InputTestName = screen.getByTestId('test_name');
    fireEvent.change(InputTestName, { target: { value: '~(I-I)~' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {
      const Message = screen.getByText("Name Invalid");
      expect(Message).toBeInTheDocument();
    }, 50); 

    });

  it('ErrorNameToast', async () => {
    render(<Formulaire />);

    const InputTestName = screen.getByTestId('test_name');
    fireEvent.change(InputTestName, { target: { value: '~(>w<)~' } }); 

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      expect(toast.error).toHaveBeenCalledWith("NameInvalid.", expect.anything());
    }, 50); 
  });

  //Firstname
  it('ErrorFirstName', async () => {
    render(<Formulaire />);

    const InputTestFirstname = screen.getByTestId('test_firstame');
    fireEvent.change(InputTestFirstname, { target: { value: '~(q-q)~' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {
      const Message = screen.getByText("Firstname Invalid");
      expect(Message).toBeInTheDocument();
    }, 50); 

    });

  it('ErrorFirstNameToast', async () => {
    render(<Formulaire />);

    const InputTestFirstname = screen.getByTestId('test_firstame');
    fireEvent.change(InputTestFirstname, { target: { value: '~(<-<)~' } }); 

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      expect(toast.error).toHaveBeenCalledWith("FirstnameInvalid.", expect.anything());
    }, 50); 
  });

  //City
  it('ErrorCity', async () => {
    render(<Formulaire />);

    const InputTestCity = screen.getByTestId('test_city');
    fireEvent.change(InputTestCity, { target: { value: '~(y-y)~' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {
      const Message = screen.getByText("City Invalid");
      expect(Message).toBeInTheDocument();
    }, 50); 

    });

  it('ErrorCityToast', async () => {
    render(<Formulaire />);

    const InputTestCity = screen.getByTestId('test_city');
    fireEvent.change(InputTestCity, { target: { value: '~(-_.)~' } }); 

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      expect(toast.error).toHaveBeenCalledWith("CityInvalid.", expect.anything());
    }, 50); 
  });
});

// Le nom est valide
describe('Validation Name', () => {
  it('Return_Wrong_Name', async () => {
    render(<Formulaire />);

    const InputTestName = screen.getByTestId('test_name');
    fireEvent.change(InputTestName, { target: { value:  '\ [T] /' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      const Message = screen.getByText('Name Invalid');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });

  it('Return_Good_Name ', async () => {
    render(<Formulaire />);

    const InputTestName = screen.getByTestId('test_name');
    fireEvent.change(InputTestName, { target: { value: 'Solaire' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {

      const Message = screen.getByText('its work');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });
}
);

// Le prenom est valide
describe('Validation FirstName', () => {
  it('Return_Wrong_FirstName', async () => {
    render(<Formulaire />);

    const InputTestFirstName = screen.getByTestId('test_firstname');
    fireEvent.change(InputTestFirstName, { target: { value:  '\ [T] /' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      const Message = screen.getByText('FirstName Invalid');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });

  it('Return_Good_FirstName ', async () => {
    render(<Formulaire />);

    const InputTestFirstName = screen.getByTestId('test_firstname');
    fireEvent.change(InputTestFirstName, { target: { value: 'Astorias' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {

      const Message = screen.getByText('its work');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });
}
);

// La ville est valide
describe('Validation City', () => {
  it('Return_Wrong_City', async () => {
    render(<Formulaire />);

    const InputTestCity = screen.getByTestId('test_city');
    fireEvent.change(InputTestCity, { target: { value:  '\ [T] /' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);

    setTimeout(() => {
      const Message = screen.getByText('City Invalid');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });

  it('Return_Good_Name ', async () => {
    render(<Formulaire />);

    const InputTestCity = screen.getByTestId('test_city');
    fireEvent.change(InputTestCity, { target: { value: 'Anorlondo' } });

    const InputTestButton = screen.getByTestId('test_button');
    fireEvent.submit(InputTestButton);
    setTimeout(() => {

      const Message = screen.getByText('its work');
      expect(Message).toBeInTheDocument();
    }, 50); 
  });
}
);