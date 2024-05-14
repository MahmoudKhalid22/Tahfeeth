import Form from "./InputForm/Form";

function Input({ onSetIsLogin }) {
  return (
    <div className="flex items-center justify-center flex-row-reverse w-full lg:-translate-x-1/2 translate-y-0">
      {/* <Image /> */}
      <Form onSetIsLogin={onSetIsLogin} />
    </div>
  );
}

export default Input;
