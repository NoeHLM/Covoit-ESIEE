import Cookies from "js-cookie";

const state = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
};


const loginUser = async (formLogin) => {
    try {
        const res = await fetch(`${process.env.VUE_APP_API_ADDRESS}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formLogin)
        });

        const data = await res.json(); 

        const { accessToken, refreshToken } = data; 

        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isLoggedIn = true;
        return { success: true };
    } catch (err) {
        console.error(err);
        return { success: false, error: err.response };
    }
};


const logoutUser = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    state.accessToken = null;
    state.refreshToken = null;
    state.isLoggedIn = false;
};

export { state, loginUser, logoutUser };
