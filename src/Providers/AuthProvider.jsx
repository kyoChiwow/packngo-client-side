import { app } from "@/Firebase/firebase.config";
import AuthContext from "@/Hooks/AuthContext";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"


const auth = getAuth(app)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Observer settings here
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            return unsubscribe();
        }
    }, [])
    // Observer settings here

    const authInfo = {
        loading,
        setLoading,
        user,
        setUser,
        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AuthProvider;