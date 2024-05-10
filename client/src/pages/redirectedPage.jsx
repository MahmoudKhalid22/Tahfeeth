import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectPage = ({ onSetIsLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userData = JSON.parse(searchParams.get("user"));
    console.log(userData);

    const user = {
      userData: userData?.existingUser || userData?.user,
      refreshToken: userData.refreshToken,
      accessToken: userData.accessToken,
    };

    console.log(user);

    localStorage.setItem("data", JSON.stringify(user));

    navigate("/details");
    onSetIsLogin(true);

    // هنا يمكنك استخدام بيانات المستخدم لعرضها للمستخدم أو تسجيل الدخول وما إلى ذلك
  }, [location.search, navigate, onSetIsLogin]);

  return (
    <div>
      <h1>Redirecting...</h1>
      {/* هنا يمكنك عرض رسالة أو رمز تحميل */}
    </div>
  );
};

export default RedirectPage;
