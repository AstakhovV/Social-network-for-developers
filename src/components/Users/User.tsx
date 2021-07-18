import React from "react";
import userPhoto from '../../assets/image/user.jpg'
import {UsersType} from "../../Types/CommonTypes";
import 'antd/dist/antd.css';
import {Avatar, Button, List} from "antd";


type PropsType ={
    user: UsersType,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}


const Users: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    const data = [
        {
            user: user,
            followingInProgress: followingInProgress,
            unfollow: unfollow,
            follow: follow,
        },
    ];

    return (

        <List
            itemLayout="horizontal"
            dataSource={data}
            bordered
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={user.photos.small != null ? user.photos.small : userPhoto}/>}
                        title={<a href={'#/profile/' + user.id}>{user.name}</a>}
                        description={user.status}
                    />

                    <div>{user.followed
                        ? <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}> Unfollow </Button>
                        : <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}> Follow </Button>}</div>
                </List.Item>
            )}
        />
    )
}
export default Users
