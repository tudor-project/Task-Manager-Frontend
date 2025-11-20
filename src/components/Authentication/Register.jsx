import React, {useContext} from "react";
import AuthContext from "../../Context/AuthContext";


export const Register = () =>{
    const {
        credentials,
        storeUser,
        onChange,
        errors,
    } = useContext(AuthContext);

    return(
        <div className="w-60 h-60">
            <form className="flex flex-col space-y-3" onSubmit={storeUser}>
                <input type="text" name="name" placeholder="Name" value={credentials.name} onChange={onChange}/>
                {errors.name && <span className="text-sm text-red-400 ">{errors.name[0]}</span>}

                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={onChange}/>
                {errors.email && <span className="text-sm text-red-400 ">{errors.email[0]}</span>}

                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange}/>
                {errors.password && <span className="text-sm text-red-400 ">{errors.password[0]}</span>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
}