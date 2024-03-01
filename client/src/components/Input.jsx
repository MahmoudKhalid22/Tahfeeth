import Image from "./InputForm/Image";
import Form from "./InputForm/Form";

function Input({ onSetIsLogin }) {
  return (
    <div className="flex items-center justify-center flex-row-reverse mx-8 mt-0 mb-8 w-[60%] h-screen -translate-x-1/2 translate-y-0">
      <Image />
      <Form onSetIsLogin={onSetIsLogin} />
    </div>
  );
}

export default Input;
