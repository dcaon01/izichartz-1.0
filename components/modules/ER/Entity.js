'use client';

import { useDispatch } from "react-redux";
import classes from "./Entity.module.css";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import { elementsSlice } from "@/store/design/elements-slice";
import { motion } from 'framer-motion';

/**
 * Entity
 * Componente che renderizza un'entità del modello ER.
 * @param id indice e identificatore dell'elemento all'interno dell'array degli elementi.
 * @param options opzioni utili al rendering dell'elemento.
 * @param selected flag di selezione dell'elemento.
 */
export const Entity = memo(function Entity({ id, options, selected, links, functs }) {
    /* Prelevamento delle opzioni utili */
    let text = options.text; // Testo interno al rettangolo.
    let position = options.position; // Oggetto posizione.
    let connecting = options.connecting // Gestione della connessione.

    /* Elementi d'utility */
    let [svgWidth, setSvgWidth] = useState(100);
    const svgHeight = 70;
    let [grabbing, setGrabbing] = useState(false); // Gestione del grabbing.
    let [offset, setOffset] = useState({ x: 0, y: 0 }); // Oggetto di offset.
    let curs = "pointer"; // Selettore del pointer.
    let tLength = text.length * 1.3; // Oggetto che calcola un limite superiore alla grandezza della casella di testo.
    const dispatch = useDispatch(); // Prelevamento del riferimento di useDispatch per poterlo usare liberamente.

    /* Refs */
    let inputRef = useRef();
    let entityRef = useRef();
    // Utilizzo di useEffect per permettere prima la renderizzazione e istanziazione delle ref.
    useEffect(() => {
        setSvgWidth(tLength === 0 ? 100 : inputRef.current.offsetWidth + 40);
    }, [entityRef, svgWidth, entityRef, text]);

    /**
     * handleSelection
     * Funzione che gestisce la selezione dell'elemento aggiornando lo slice
     * globale.
     * @param event oggetto evento triggerato onClick.
     */
    const handleSelection = useCallback((event) => {
        event.stopPropagation();
        // Fare una funzione che verifichi se qualcuno è in connessione, ritorni l'id di quel qualcuno.
        // Se qualcuno è in connessione richiamare una funzione in ER, passando ad essa i due id, e le due refs.
        let idConnect = functs.whoIsConnecting();
        console.log(idConnect);
        if (idConnect !== 0) {
            functs.createLinker(entityRef);
        } else {
            dispatch(elementsSlice.actions.setSelectedElement(id));
            dispatch(elementsSlice.actions.setConnectingElement(0));
        }
    });

    /**
     * handleConnection
     * Funzione che gestisce la connessione (provvisoria) dell'elemento, aggiornanod
     * lo slice globale.
     * @param event oggetto evento triggerato onDoubleClick.
     */
    const handleConnection = useCallback((event) => {
        event.stopPropagation();
        dispatch(elementsSlice.actions.setConnectingElement(id));
    });

    /**
     * handleGrabbing
     * Funzione che gestisce il calcolo dell'offset tra la posizione
     * dell'elemento cliccato e quella dl puntatore, in modo da gestire al
     * meglio il trascinamento. 
     * @param event oggetto evento triggerato onMouseDown.
     */
    const handleGrabbing = useCallback((event) => {
        event.preventDefault();
        dispatch(elementsSlice.actions.setConnectingElement(0));
        inputRef.current.blur();
        setGrabbing(true);
        let x = event.clientX - position.x;
        let y = event.clientY - position.y;
        setOffset({ x, y });
    });

    /**
     * handleNotGrabbingAnymore
     * Funzione che gestisce il fatto che l'utente non prema più sull'elemento.
     */
    const handleNotGrabbingAnymore = useCallback(() => {
        setGrabbing(false);
    });

    /**
     * handleDragging
     * Funzione che gestisce il trascinamento dell'elemento.
     * @param event oggetto evento triggerato onMouseMove.
     */
    const handleDragging = useCallback((event) => {
        event.preventDefault();  // Sistema il dragging merdoso
        if (grabbing) {
            let x = event.clientX - offset.x;
            let y = event.clientY - offset.y;
            dispatch(elementsSlice.actions.modifyElementOptions({ id: id, option: "position", value: { x, y } }))
        }
    });

    /**
     * handleLeaving
     * Funzione che gestisce il mouse che se va dalla superficie dell'elemento.
     * Deve essere messa per forza sennò grabbing rimarrebbe settato, fornendo
     * una brutta UE. 
     */
    const handleLeaving = useCallback(() => {
        setGrabbing(false);
    });

    /**
     * handleInput
     * Funzione che gestisce l'input da textbox dell'utente.
     * @param event oggetto evento triggerato onChange.
     */
    const handleInput = useCallback((event) => {
        dispatch(elementsSlice.actions.modifyElementOptions({ id: id, option: "text", value: event.target.value }));
    });

    /**
     * handleInputInsert
     * Funzione che gestisce la propagazione dell'evento onClick della textbox al div esterno.
     * Siccome l'evento che vogliamo prelevare è lo stesso dell'elemento contenente, di default viene
     * triggerata quella, non facendo più modificare la textbox.
     * @param event oggetto evento triggerato onClick.
     */
    const handleInputInsert = useCallback((event) => {
        event.stopPropagation();
    });

    /**
     * handleKeyPress
     * Funzione che si occupa di rilevare se qualche tasto è stato premuto e agire di conseguenza.
     * Per ora gestiamo solo l'invio, come mantenimento dello stato attuale e deselezione. Potremmo pensare di inviare
     * le modifiche con una actionCreator. Quindi inviamo le modifiche (o le salviamo anche nello storico) solo se l'elemento è 
     * stato deselezionato e lo stato è cambiato nello storico.
     * Come esc si potrebbe implementare un indietro nello storico e inviare la modifica.
     */
    const handleKeyDown = useCallback((event) => {
        console.log(event.key);
        if (event.key === "Enter" && selected) {
            event.stopPropagation();
            dispatch(elementsSlice.actions.setSelectedElement(0));
            dispatch(elementsSlice.actions.setConnectingElement(0));
            // Salva lo stato nello storico.
            // Invia i dati al DB.
        }
    });
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, []);

    /* Gestione dinamica del cursore */
    if (selected) {
        if (grabbing) {
            curs = "grabbing"
        } else {
            curs = "move";
        }
    }

    /* Rendering */
    return (
        <motion.div
            id={id}
            onClick={handleSelection}
            onDoubleClick={handleConnection}
            onMouseDown={selected ? handleGrabbing : null}
            onMouseUp={selected ? handleNotGrabbingAnymore : null}
            onMouseMove={selected ? handleDragging : null}
            onMouseLeave={handleLeaving}
            className={classes.entity}
            style={{
                top: position.y,
                left: position.x,
                cursor: curs,
            }}
            ref={entityRef}
        >
            <input
                id={`input-${id}`}
                type="text"
                value={text}
                ref={inputRef}
                onChange={handleInput}
                onMouseDown={handleInputInsert} // Abbiamo dovuto sovrascrivere l'evento del padre
                className={classes.entityInput}
                style={{
                    width: tLength === 0 ? 20 : tLength + "ch",
                    cursor: selected ? "text" : "pointer"
                }}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: "absolute",
                    height: svgHeight,
                    width: !(svgWidth === 0) ? svgWidth : 100,
                }}
            >
                {connecting &&
                    <motion.rect
                        x="4"
                        y="4"
                        rx="5"
                        ry="5"
                        fill="transparent"
                        stroke="black"
                        strokeWidth="1"
                        style={{
                            zIndex: 1,
                        }}
                        initial={{
                            height: svgHeight - 14,
                            width: svgWidth - 14,
                        }}
                        animate={{
                            height: svgHeight - 8,
                            width: svgWidth - 8,
                        }}
                        transition={{ duration: 0.1 }}
                    />
                }
                <motion.rect
                    height={svgHeight - 14}
                    width={svgWidth - 14}
                    x="7"
                    y="7"
                    rx="5"
                    ry="5"
                    fill="white"
                    stroke="black"
                    animate={{
                        strokeWidth: selected ? "2.5px" : "0.5px",
                        zIndex: 2
                    }}
                    transition={{ duration: 0.1 }}
                />
            </svg>
        </motion.div>
    );
});
