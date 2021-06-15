import React from 'react';

import './Modal.scss';

const Modal = () => {
    return (
        <div className="modal modal--active">
            <h3 className="modal__header">edit task</h3>
            <form>
                <div className="modal__box">
                    <input type="text" className="modal__box-input" />{' '}
                    <button className="modal__btn">add</button>
                </div>
                <button className="modal__btn modal__btn--cancel">cancel</button>
            </form>
        </div>
    );
};

export default Modal;
