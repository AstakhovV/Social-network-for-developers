import React, {ChangeEvent, useState} from 'react';
import s from './profileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import user from '../../../assets/image/user.jpg'
import ProfileDataForm from "./ProfileDataForm";
import {ProfileType} from "../../../Types/CommonTypes";
import {Button, Card} from "antd";
import {EditOutlined} from '@ant-design/icons';
import {ProfileData} from "./ProfileData";

const { Meta } = Card


type PropsType = {
    profile: ProfileType | null
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile:ProfileType) => Promise<any>

}

const ProfileInfo: React.FC<PropsType> = ({saveProfile, ...props}) => {
    let [editMode, setEditMode] = useState(false);
    const hiddenFileInput = React.useRef(null)

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })
    }

    const handleClick = () => {
        // @ts-ignore
        hiddenFileInput.current.click()
    }

    return (
        <div>
            <Card
                style={{ width: 400 }}
                cover={
                    <div>
                        <img
                            alt="example"
                            className={s.photo}
                            src={props.profile.photos.large || user}
                        />
                        {props.isOwner &&
                        <>
                            <Button className={s.button} onClick={handleClick}>Upload image</Button>
                            <input type={'file'} onChange={onMainPhotoSelected} style={{display: 'none'}}
                                   ref={hiddenFileInput}/>
                        </>
                        }
                    </div>
                }
                actions={[
                    <EditOutlined key="edit" onClick={ () => {
                        setEditMode(true)
                    }} />
                ]}
            >
                <Meta
                    title={
                        <div>
                            <ProfileStatusWithHooks status={props.status}
                                                    isOwner ={props.isOwner}
                                                    updateStatus={props.updateStatus}/>
                        </div>
                    }
                    description={
                        <div className={s.item}>
                            <>
                                {editMode && props.isOwner
                                    ? <ProfileDataForm profile={props.profile}
                                                       initialValues={props.profile}
                                                       onSubmit={onSubmit}
                                    />
                                    : <ProfileData profile={props.profile}
                                                   isOwner={props.isOwner}
                                                   goToEditMode={() => {
                                                       setEditMode(true)
                                                   }}
                                    />}
                            </>
                        </div>
                    }
                />
            </Card>
        </div>
    )
}

export default ProfileInfo;