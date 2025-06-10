import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { IMessageContext, MessageContext } from "@/context/message-context";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/services/auth";
import { logIn } from "@/store/auth";
import { storageService } from "@/utils/storage";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { showSnackbar } = useContext(MessageContext) as IMessageContext;

  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedData = storageService.getRememberMeData();
    if (savedData) {
      setEmail(savedData.email);
      setRemember(savedData.remember);
    }
  }, []);

  const gotoForgetPassword = () => {
    navigate("/forgot-password");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ email, password }).unwrap();

      if (!user || !token) throw new Error();

      dispatch(logIn({ token, user }));

      if (remember) {
        storageService.setRememberMeData({ email, remember: true });
      } else {
        storageService.clearRememberMe();
      }

      navigate("/dashboard");
    } catch {
      showSnackbar("Invalid email or password!", "Please enter correct login details", "error");
    }
  };

  return {
    state: { email, password, remember, isLoading },
    setState: { setEmail, setPassword, setRemember },
    handlers: { handleSubmit, gotoForgetPassword },
  };
};

export default useLogin;
