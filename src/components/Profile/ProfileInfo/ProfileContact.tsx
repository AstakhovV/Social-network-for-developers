import React from "react";
import s from "./profileInfo.module.css";

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contact: React.FC<ContactsPropsType> = ({contactTitle,contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}