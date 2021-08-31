import { useState } from 'react';

export const useModal = (initialState = (false)) => {
    const [show, setShow] = useState(initialState);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return {
        handleClose,
        handleShow,
        show
    };
};