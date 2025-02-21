import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { Children, createContext, useEffect, useState, useContext } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        console.log('user: ', user);
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else{
                setIsAuthenticated(false);
                 setUser(null);
            }
        })
        return unsub;
    }, []);

    const updateUserData = async (userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user,fullname: data.fullname, username: data.username, userId: data.userId})
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return{sucess: true};
        } catch(e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg= 'Email invalido'
            if(msg.includes('auth/invalid-credential')) msg= 'Credenciais invalidas'
            return {sucess: false, msg}
        }
    };

    const logout = async () => {
        try{
            await signOut(auth);
            return {sucess: true}
        } catch(e) {
            return {sucess: false, msg: e.message, error: e};
        }
    };

    const register = async (email, password, fullname, username) => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user : ', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                fullname,
                username,
                userId: response?.user?.uid
            });
            return {sucess: true, data: response?.user};
        } catch(e){
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg= 'Email invalido'
            if(msg.includes('(auth/email-already-in-use)')) msg= 'Email ja em uso'
            return {sucess: false, msg}
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = ()=>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}