import React, {useContext, useEffect} from "react";
import AuthContext from "../../Context/AuthContext";

export const Login = () => {
    const {
        defaultCredentials,
        credentials,
        setCredentials,
        onChange,
        errors,
        login
    } = useContext(AuthContext);
    useEffect(() => {
        setCredentials(defaultCredentials);
    },[])

    return(
        <div className="w-60 h-60" onSubmit={login}>
            <form className="flex flex-col space-y-3">
                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={onChange} />
                {errors && <span className="text-red-500">{errors.email}</span>}

                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
                {errors && <span className="text-red-500">{errors.password}</span>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
}