import { createSlice } from "@reduxjs/toolkit";

/* Stato iniziale dello slice componentsSlice.
L'array contiene tutti i JSON che codificano gli elementi presenti nel
workpane. */
const init = [
    {
        type: "Entity",
        id: 1,
        selected: false,
        options: {
            text: "ENTITY1",
            position: {
                x: 150, 
                y: 200,
            },
            connecting: false,
        }
    },
    {
        type: "Entity",
        id: 2,
        selected: false,
        options: {
            text: "ENTITY2",
            position: {
                x: 400, 
                y: 300,
            },
            connecting: false,
        },
    },
    {   
        type: "Relationship",
        id: 3,
        selected: false,
        options: {
            text: "RELATIONSHIP1",
            position: {
                x: 600, 
                y: 150,
            },
            connecting: false
        },
    },
    {
        type: "Link",
        id: 4,
        selected: false,
        options: {
            text: "",
            linked: [1, 3], // Id degli Elementi che devono essere collegati.
            segments: [       // Segmenti che compongono la linea. Il primo parte dal primo elemento, il secondo termina nel secondo
                {}
            ],
        }
    }
];

/* Creiamo uno slice che memorizza gli elementi grafici che ci sono all'interno di
un workpane come oggetti all'interno dell'array presente nello slice stesso.*/
export const elementsSlice = createSlice({
    name: "designElements",
    initialState: init,
    reducers: {
        /**
         * addElement
         * Reducer che si occupa dell'aggiunta di un elemento. 
         * @param element oggetto contenente tutte le info da aggiungere all'array degli elementi.
         */
        addElement(element) {

        },

        /**
         * removeElement
         * Reducer che si occupa dell'eliminazione di un elemento.
         * @param id identificatore dell'elemento da eliminare.
         */
        removeElement() {
        },

        /**
         * modifyOptionElement
         * Reducer che si occupa della modifica di una opzione di un determinato elemento.
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elemento.
         * - option: nome dell'opzione da modificare.
         * - value: valore con cui modificare quell'opzione.
         */
        modifyElementOptions(state, action) {
            state[action.payload.id - 1].options[action.payload.option] = action.payload.value;
        },

        /**
         * setSelectedElements
         * Reducer che si occupa del setting della selezione.
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elemento da selezionare. Se 0, imposta tutti gli elementi come non selezionati.
         */
        setSelectedElement(state, action) {
            const id = action.payload;
            if (id === 0) {
                state.forEach((element) => {
                    element.selected = false;
                });  
            } else {
                state.forEach((element) => {
                    if (element.id === id) {
                        element.selected = true;
                    } else {
                        element.selected = false;
                    }
                });
            }
        },

        /**
         * setConnectionElement
         * Reducer che si occupa del setting della connessione.
         * @param state stato corrente.
         * @param action azione che ha scatenato questa reducer. Il payload dell'azione avrà i 
         * seguenti parametri:
         * - id: id dell'elemento da settare come "in connessione". Se 0, imposta tutti gli elementi come non "in connessione".
         */
        setConnectingElement(state, action){
            const id = action.payload;
            if (id === 0) {
                state.forEach((element) => {
                    // element.selected = false;
                    if(element.options.connecting){
                        element.options.connecting = false;
                    }
                });
            } else {
                state.forEach((element) => {
                    if (element.id === id) {
                        element.options.connecting = true;
                    } else {
                        element.options.connecting = false;
                    }
                });
            }
        }
    }
});