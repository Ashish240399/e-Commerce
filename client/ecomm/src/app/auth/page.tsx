import { redirect } from "next/navigation";

type Props = {};

const AuthPage = (props: Props) => {
  redirect("auth/login/");
};

export default AuthPage;
