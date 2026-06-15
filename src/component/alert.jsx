import useEcommerceContext from "../context/useEcommerceContext";

const Alert = () => {
  const { alertInfo } = useEcommerceContext();
  if (!alertInfo.visible) return null;

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-4"
      style={{ zIndex: 9999 }}
    >
      <div
        className={`alert alert-${alertInfo.type} alert-dismissible fade show shadow`}
        role="alert"
      >
        {alertInfo.message}
      </div>
    </div>
  );
};

export default Alert;
