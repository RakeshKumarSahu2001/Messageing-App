import mongoose from "mongoose";
import { User } from "./user.model";

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    type: {
        type: String,
        require: true
    },
    provider: {
        type: String,
        require: true
    },
    providerAccountId: {
        type: String,
        require: true
    },
    refresh_token: {
        type: String,
        require: false
    },
    access_token: {
        type: String,
        require: false
    },
    expire_at: {
        type: Number,
        require: false
    },
    token_type: {
        type: String,
        require: false
    },
    scope: {
        type: String,
        require: false
    },
    id_token: {
        type: String,
        require: false
    },
    session_state: {
        type: String,
        require: false
    }

})

export const Account = mongoose.model("Account", accountSchema);
