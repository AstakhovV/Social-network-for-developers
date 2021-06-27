import {GetItemType, instance, APIResponseType} from "./api";
import {profileAPI} from "./profile-api";


export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                return res.data;
            })
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`). then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
    }
}