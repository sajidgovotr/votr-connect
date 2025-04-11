import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { IMessageContext, MessageContext } from "@/context/message-context";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/services/auth";
import { logIn } from "@/store/auth";
import { USERS } from "@/constants/roles";
const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [_login, { isLoading, }] = useLoginMutation();
    const { showSnackbar } = useContext(MessageContext) as IMessageContext;


    const [remember, setRemember] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const gotoForgetPassword = () => {
        navigate("/forgot-password")
    }
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // If you use API then uncomment this below line and remove the dispatcher;
        // login({ email, password });

        // this is just for dummy purpose;
        const authenticatedUser = USERS?.find((user) => {
            return user.password === password && user.email === email;
        });

        if (authenticatedUser) {
            dispatch(
                logIn({
                    token: "xxx",
                    user: authenticatedUser
                })
            );
        } else {
            showSnackbar(
                `Invalid email or password!`,
                "Please enter correct login details",
                "error"
            );
        }
    };



    return {
        state: { email, password, remember, isLoading },
        setState: { setEmail, setPassword, setRemember },
        handlers: { handleSubmit, gotoForgetPassword },
    };
}

export default useLogin;