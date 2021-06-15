import React from 'react';

const Modal = () => {
    return (
        <div className="modal">
            <h3>edit task</h3>
            <form>
                <div>
                    <input type="text" /> <button>edit</button>
                </div>
                <button>cancel</button>
            </form>
        </div>
    );
};

export default Modal;
