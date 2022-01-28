import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link, useHistory } from "react-router-dom";
import "./404.scss";

const Page404 = () => {
  let history = useHistory();
  return (
    <div className="error-404">
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
        }}
        to="/"
      >
        Back to main page
      </Link>
      <Link
        className="link-backpage"
        onClick={() => {
          history.goBack();
        }}
      >
        back to page
      </Link>
    </div>
  );
};

export default Page404;
