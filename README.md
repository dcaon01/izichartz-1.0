# DOCS 


## Cos'è Izichartz
Izichartz è un progetto [Next.js](https://nextjs.org/) creato con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Il suo obiettivo è quello di aiutare gli utenti con la progettazione grafica tramite l'utilizzo di un tool grafico e diversi moduli che permettono di utilizzare diversi modelli di progettazione. Ciascun modulo è sviluppato sulla base del modello di riferimento, con funzionalità efficaci che velocizzano il workflow dell'utente, che dovrà pensare solamente alla progettazione e non a perdere tempo dietro a inutili e tediosi aggiustamenti di layout.
Facciamo prima i componenti per l'ER che funzionano, poi cerchiamo di generalizzare per tutti i moduli.


## Librerie Esterne Utilizzate
<!-- - **Typescript**: per la gestione di tipi statici. [Docs](https://www.typescriptlang.org/docs/) PER ORA LO LASCIAMO STARE-->
- **Redux Toolkit**: per una gestione migliore degli stati. [Docs](https://redux-toolkit.js.org/usage/nextjs)
- **Framer Motion**: per animare l'applicazione. [Docs](https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=PerformanceMax-Framer_&gad_source=1&gclid=CjwKCAjw48-vBhBbEiwAzqrZVPK9OUm1ZKgYlNwriO01FcAHAsEpZ2kxMAWIwdV13ztZ8HaSvrPvXBoCBYEQAvD_BwE)
- **Tailwind**: per uno styling CSS più rapido. [Docs](https://tailwindcss.com/docs/installation)


## Routing
Ecco il routing dell'applicazione:
- Home: "/"
    - About: " /about "
    - Contact Us: " /contactus "
    - Login: " /login "
    - Register: " /login "
    - [ User ]: " /user-id "
        - Settings: " /settings "
        - Billing: " /billing "
        - Workspace: " /workspace "
            - [ project-id ]: " /project-id "


## Project Structure
Ecco la spiegazione della struttura del progetto:
- **app**: si trovano solo i file che sono correlati con il routing dell'applicazione in Next.
- **lib**: si trovano i file che gestiscono la parte server dell'applicazione, quindi le server actions. Le sottocartelle indicano il relativo routing o la sezione in cui sono utilizzate.
- **components**: si trovano i file che definiscono i componenti che costruiscono il contenuto dell'applicazione e che verranno utilizzati all'interno della directory app. Non sono strettamente correlati al routing dell'applicazione ma, come detto, ne costituiscono il contenuto.   
Le sottocartelle indicano il relativo routing o la sezione in cui sono utilizzati. All'interno di **components** troviamo:
    - **modules** si trovano i componenti che gestiscono la parte cicciosa dell'applicazione

## Components
### Graphics
Per fare robe grafiche utilizza [svg](https://www.w3schools.com/graphics/svg_intro.asp). 
- Rectangle: potremo fare in modo che per modificare un elemento lo dobbiamo selezionare. In questo modo possiamo far venire fuori tutte le opzioni del caso. Per gestire la deselection con un click al di fuori del quadrato dovremo utilizzare stati condivisi. 

### Workpane
Il **workpane** è lo spazio di lavoro sulla quale andranno ad essere disegnati i componenti grafici. E' sulla base di esso e del suo contenuto che potranno essere generate le immagini. La sua dimensione è uguale a quella della pagina. Il suo interno invece sarà in overflow in modo che possa essere scrollabile sia in altezza che in larghezza.
All'interno del workpane non si può zoommare all'infuori più della dimensione massima del progetto. 
Bisognerebbe trovare un modo di calcolare delle funzioni di zoom in modo da zoommare. Potremmo tenere in memoria un fattore di zoom, che è fisso ogni volta che apriamo un progetto, ma poi andare a cambiarlo quando lavoriamo. Quel fattore potremmo metterlo moltiplicato a tutti i parametri assoluti e gestire dinamicamente la cosa in questo modo. 
Trovare anche il modo di matchare il contenuto del workpane se la view del workpane è più ampia della dimensione del contenuto stesso. Infatti la view del worpane sarà sempre settata per essere uguale alla finestra, e far andare in overflow il contenuto. Non possiamo quindi avere una dimensione fissa del contenuto del workpane, ma deve essere dinamica.

### Generator
Il **Generator** è quello che si occupa di generare.


## Modules
I moduli sono 
Il modulo ER viene richiamato una volta che deve essere mostrato un record di database del tipo ER. Riceve un oggetto JSON che ha questa struttura:
```
{
    module: ...,
    elements: [
        {
            id: ...,
            type: ...,
            options: {
                ...
            }
        },
        {
            id: ...,
            type: "",
            options: {
                ...
            }
        },
        ...
        ],
        recommended: {
            height: ...,
            width: ...
        }
}
```

Questo tipo di oggetto racchiude le informazioni necessarie per la renderizzazione del progetto a video (mancano ancora i collegamenti e magari un sistema di chiavi in modo da poter interconnettere i componenti.)
- **module**: indica il tipo di modulo salvato. 
- **elements**: array di elementi presenti nel progetto.

### ER
Possiamo andare a creare dei componenti ER che ricalcano i concetti ER e che utilizzano componenti grafici. Quindi nei componenti, creiamo delle cartelle relative ai componenti dell'er, uml etc. Ad esempio, per l'appunto, nell'ER avremmo l'entità che non sarà solo composta dal rettangolo, ma anche dai pallini, stessa cosa le relazioni. Poi ci saranno componenti creati ad hoc, come la tendida che esce schiacciando il tasto destro, che potrebbe essere diversa da modulo a modulo, e anche il menu laterale.
- **Linkers** : la gestione dei linkers è abbastanza complicata. Hanno la seguente struttura:
```
{
    type: "linker",
    id: 4,
    selected: false,
    options: {
        text: "",
        linked: [1, 3], 
        segments: [ 
            {}
        ],
    }
}
```
linked è un array di 2 elementi che mi identificano i due elementi che sono stati collegati.
I segments sono messi in ordine, nel senso che il primo elemento dell'array è collegato al primo elemento in linked, e l'ultimo elemento in segments è collegato al secondo. Questo ci aiuta a gestire la logica della generazione di parti di codice condizionale, come i pallini che si possono trascinare per cambiare la forma del linker.

**Strati degli elementi**
z-index: 
- 0 -> Workpane;
- 1 -> Linkers / Generalisation
- 2 -> Attributes
- 3 -> Entities
- 4 -> Inputs

## Database
L'applicazione deve gestire tutta una serie di funzionalità dell'utente. 
Quindi abbiamo sicuro la tabella USER per memorizzare i dati dell'utente, che avrà i seguenti attributi:
- name: nome dell'utente.
- surname: cognome dell'utente.
- email: che farà da chiave primaria.
- birhtdate: data di nascita.
- employment (studente, lavoratore, privato, azienda... Per quest'ultima sarebbe da far inserira la partita iva) 
(campo in integrità referenziale con una tabella in cui ci sono le varie opzioni disponibili).

Dobbiamo memorizzare anche tutti i dati relativi ai progetti, che devono essere associati ad un determinato utente:
- name: nome del progetto
- id: progetto, che sarà un int incrementale, o una roba del genere
- content: che altro non sarà che un JSON o JSONB con tutte le informazioni necessarie alla traduzione del progetto in grafica.
- module: tipo di modulo.
- owner: che sarà un campo in integrità referenziale con la chiave primaria della tabella USER.

Potremmo pensare di implementare anche una tabella per le fatture:
- client: email del cliente a cui deve essere stilata la fattura
- date: data di fatturazione.
- id: identificativo della fattura.
- amount: fatturato.

Utilizzare le tabelle per creare il diagramma relazionale del DB che andremo ad utilizzare.

## Responsiveness
Lo zoom viene già gestito in automatico visto che i componenti hanno tutti una posizione e una dimensione assoluta e non relativa.
L'unica cosa che dobbiamo gestire è la quantità di zoom che si può fare sul workapane, poiché è proprio quest'ultimo che deve sempre riempire
la dimensione della finestra osservabile.


<!-- INGLESE
## Docs
Izichartz is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Its goal is to help users with software design through a grafic tool and various design model modules. Each module is specifically developed 
for the relative design model, with effective functionalities that will help the user fastening his workflow and focusing on the design and the development, instead of wasting time with useless layout adjustments. 

### Installed Dependencies
- **Typescript**: for static types management. [Docs](https://www.typescriptlang.org/docs/)
- **Redux**: for better state management. [Docs](https://redux.js.org/usage/)
- **Framer Motion**: for animating the app. [Docs](https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=PerformanceMax-Framer_&gad_source=1&gclid=CjwKCAjw48-vBhBbEiwAzqrZVPK9OUm1ZKgYlNwriO01FcAHAsEpZ2kxMAWIwdV13ztZ8HaSvrPvXBoCBYEQAvD_BwE)
- **Tailwind**: for faster CSS styling. [Docs](https://tailwindcss.com/docs/installation)

### Routing
Here's the routing of the app:
- Home: "/"
    - About: "/about"
    - Contact Us: "/contactus"
    - Login: "/login"
    - Register: "/login"

### Project Structure
Here's the project structure explanation:
- **app**: only routing-related files (and relative styling files) are allowed in this directory.
- **lib**: in this folder there are files related to the backend logic.
- **components**: in this folder there are files that define the components that will be declares in the app components. 
They are not related to the routing logic, but they are the bricks that build the app.
They are divided to   

### Components
-->

[def]: https://www.w3schools.com/graphics/svg_intro.asp