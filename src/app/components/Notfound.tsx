import { useNavigate } from "react-router-dom";
const Notfound = () => {
  const navigate = useNavigate();
  const handleChangeAPIToken = () => {
    navigate("/");
  };
  return (
    <div>
      The page you are looking for is not available.{" "}
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleChangeAPIToken}
      >
        Change API Token
      </button>
    </div>
  );
};

export default Notfound;
