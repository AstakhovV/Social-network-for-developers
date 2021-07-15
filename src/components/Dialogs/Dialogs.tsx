import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {InitialStateType} from '../../redux/dialogs-reducer';
import {AddMessageFormRedux} from "./AddMesageForm";
import {Divider} from "antd";

type PropsType ={
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
}
export type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);

    let addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <>
            <Divider orientation="left">Dialogs</Divider>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>
        </>

    )
}
export default Dialogs;