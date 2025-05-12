// /hooks/useAuth.js
const useAuth = () => {
    const token = localStorage.getItem('token'); // or from Redux, Zustand, etc.
    return {
        isAuthenticated: !!token,
    };
};

export default useAuth;
