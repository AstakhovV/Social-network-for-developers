import React from 'react';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + ' ' + s.active}>
                    Tatyana
                </div>
                <div className={s.dialog}>
                    Georgiy
                </div>
                <div className={s.dialog}>
                    Alexander
                </div>
                <div className={s.dialog}>
                    Elena
                </div>
                <div className={s.dialog}>
                    Marina
                </div>
                <div className={s.dialog}>
                    Viktor
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.dialog}> Hello!</div>
                <div className={s.dialog}> Can you show me your pet's certificate?</div>
                <div className={s.dialog}> Only your Collie.</div>
            </div>
        </div>
    )
}

export default Dialogs;