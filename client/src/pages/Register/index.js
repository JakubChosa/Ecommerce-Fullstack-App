import { useState, useEffect } from "react";
import Wrapper from "./RegisterStyled";
import img from "../../assets/images/login.jpg";
import { FormInput } from "../../components";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useUserContext } from "../../context/userContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const { isLoading, showAlert, setupUser, user } = useUserContext();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const toggleMember = () => {
    setValues((prevValues) => ({
      ...prevValues,
      isMember: !values.isMember,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      showAlert("Please provide all values!");
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({ currentUser, path: "login" });
    } else {
      setupUser({ currentUser, path: "register" });
    }

    setValues({
      name: "",
      email: "",
      password: "",
      isMember: true,
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <div className="form">
        <Link to="/" className="return-btn">
          <AiOutlineClose />
        </Link>
        <form className="form-container" onSubmit={onSubmit}>
          <h3>{values.isMember ? "login" : "register"}</h3>
          {!values.isMember && (
            <FormInput
              value={values.name}
              name="name"
              type="text"
              handleChange={handleChange}
            />
          )}
          <FormInput
            value={values.email}
            name="email"
            type="email"
            handleChange={handleChange}
          />
          <FormInput
            value={values.password}
            name="password"
            type="password"
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            Submit
          </button>
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
        <div className="image-container">
          <img src={img} alt="" />
        </div>
      </div>
    </Wrapper>
  );
};
export default Register;
