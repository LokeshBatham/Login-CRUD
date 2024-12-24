import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ profileName }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    ConfirmEmail: "",
    ConfirmPassword: "",
  });
  const [loginError, setLoginError] = useState("");
  const [useName, setUserName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { ConfirmEmail, ConfirmPassword } = login;

    if (ConfirmEmail == "") {
      setLoginError("Please Enter Email");
    } else if (ConfirmPassword == "") {
      setLoginError("Please Enter Password");
    } else {
      setLoginError("");
      let baseUrl = "http://13.50.27.128/v1/login";
      axios
        .post(
          baseUrl,
          {
            ConfirmEmail: ConfirmEmail,
            ConfirmPassword: ConfirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status == 200 && response.statusText == "OK") {
            sessionStorage.setItem(
              "accessToken",
              response.data.data.accessToken
            );
            profileName(response.data.data.Name);
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {});
    }
  };
  return (
    <div className="outersec">
      <div className="row mainloginsec">
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 pl-0">
          <div className="loginleftsec">
            <h1>Simplify Management with our Dashboard.</h1>
            <h6>Simplify your e-comerce management</h6>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 pr-0 wellogin">
          <h2>Welcome Back</h2>
          <h6>Please login to your account</h6>

          <form>
            <div className="">
              <input
                className="login"
                name="ConfirmEmail"
                placeholder="Email address"
                value={login.ConfirmEmail}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="">
              <input
                className="login"
                name="ConfirmPassword"
                placeholder="Password"
                value={login.ConfirmPassword}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <p className="forget">Forget Password?</p>
            {loginError && <p>{loginError}</p>}

            <button
              className="loginButton"
              onClick={(e) => handleLogin(e)}
              type="submit"
            >
              {" "}
              Login
            </button>
          </form>
          <div className="orlogin">
            <div>
              <hr />
            </div>
            <div>Or Login with</div>
            <div>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
              <button className="loginButton1">
                {" "}
                <i class="bi bi-google"></i> Google
              </button>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
              <button className="loginButton1">
                {" "}
                <i class="bi bi-facebook"></i> Facebook
              </button>
            </div>
          </div>
          <div>
            <p className="signup">
              Don't have an account? <span>Signup</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
