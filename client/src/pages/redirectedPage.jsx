import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectPage = ({ onSetIsLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const user = JSON.parse(searchParams.get("user"));
    // // console.log(user);

    const userData = {
      user: user?.existingUser || user?.user,
      refreshToken: user.refreshToken,
      accessToken: user.accessToken,
    };

    // // console.log(userData);

    localStorage.setItem("data", JSON.stringify(userData));

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
