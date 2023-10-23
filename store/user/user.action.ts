import createAction from "@/utils/reducer/reducer.utils"
import { User } from "firebase/auth"
import { USER_ACTION_TYPES } from "./user.types"

export const setCurrentUser = (user: User | null) => {
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}