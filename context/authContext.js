import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
import { auth, db, storage } from "../firebaseConfig";  // Certifique-se de que o Firebase Storage está configurado
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';  // Para Firebase Storage

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
        });
        return unsub;
    }, []);

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({
                ...user,
                fullname: data.fullname,
                username: data.username,
                userId: data.userId,
                email: data.email,
                profileImage: data.profileImage // Certifique-se de que você tem um campo profileImage no Firestore
            });
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        } catch(e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg = 'Email inválido';
            if(msg.includes('auth/invalid-credential')) msg = 'Credenciais inválidas';
            return {success: false, msg};
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return {success: true};
        } catch(e) {
            return {success: false, msg: e.message, error: e};
        }
    };

    const register = async (email, password, fullname, username) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user : ', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                fullname,
                username,
                email,
                userId: response?.user?.uid,
                profileImage: null
            });

            return {success: true, data: response?.user};
        } catch(e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg = 'Email inválido';
            if(msg.includes('(auth/email-already-in-use)')) msg = 'Email já em uso';
            return {success: false, msg};
        }
    };

    // Função para fazer o upload da imagem de perfil
    const updateProfileImage = async (uri) => {
        if (!uri) {
            throw new Error("Por favor, forneça uma imagem");
        }

        try {
            const storageRef = ref(storage, `profile_images/${user.uid}_${Date.now()}`);
            const response = await fetch(uri);
            const blob = await response.blob();

            // Enviar imagem para o Firebase Storage
            const uploadTask = uploadBytesResumable(storageRef, blob);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Progresso do upload (opcional)
                    },
                    (error) => {
                        reject(error);
                    },
                    async () => {
                        // Quando o upload for concluído
                        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        
                        // Atualizar a URL da imagem de perfil no Firestore
                        const userRef = doc(db, 'users', user.uid);
                        await updateDoc(userRef, {
                            profileImage: imageUrl
                        });

                        // Atualizar o estado local do usuário com a nova URL da imagem
                        setUser({
                            ...user,
                            profileImage: imageUrl
                        });

                        resolve(imageUrl);
                    }
                );
            });

        } catch (error) {
            console.error("Erro ao atualizar imagem de perfil:", error);
            throw new Error("Falha ao atualizar imagem de perfil.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateProfileImage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
};
