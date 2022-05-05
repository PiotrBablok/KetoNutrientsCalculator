/* React */
import React, { useEffect, useRef, useState } from 'react'

/* Hooks */
import { useFirestore } from '../../../Hooks/useFirestore';

/* CSS */
import './ReaddModal.css';

/* Interface */
import { ReaddModalProps } from '../../../Interfaces/Interfaces';

const ReaddModal: React.FC<ReaddModalProps> = (props) => {

    /* Hooks */
    const { addDoc } = useFirestore();

    /* State */
    const [foodWeight, setFoodWeight] = useState(0);

    /* Refs */
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (modalRef.current !== null) {
                if (!modalRef.current!.contains(e.target as HTMLDivElement)) {
                    props.modalHandlerFunc({}, false);
                    setFoodWeight(0);
                }
            }
        })
    }, [])

    /* Add again food to Added Food */
    function addFoodAgain() {
        if (foodWeight > 0) {
            addDoc({
                ...props.addAgain,
                consumedFoodWeight: foodWeight,
            }, false);
        }

        setFoodWeight(0);
        props.modalHandlerFunc({}, false);
    }

    return (
        <>
            {props.oponCloseModal &&
                <div ref={modalRef} className='addModal'>
                    <form className='addModalForm'>
                        <label>{props.addAgain.foodName}</label>
                        <label>Amount of food consumed (g)</label>
                        <input type="number" onChange={(e) => { setFoodWeight(Number(e.target.value)) }} value={`${foodWeight}`} />
                        <button onClick={addFoodAgain}>Add</button>
                    </form>
                </div>
            }
        </>
    )
}

export default ReaddModal