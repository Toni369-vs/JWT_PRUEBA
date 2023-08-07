import axios from "axios"

const getState = ({ getStore, getActions, setStore }) => {
	return {


		store: {

			user: {
				"email": "",
				token: localStorage.getItem("token"), 
			},


			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			cleanStore: () => {
				//Eliminamos token de la store y de la sesión del navegador
				console.log("Limpiando store...");
				setStore({ user: { "email": "", "token": "" } });
				localStorage.removeItem("token");
				setStore({ logged: false });
			},


			// FUNCION PARA LOGIN
			login: async (dataEmail, dataPassword) => {
				try {
					// Realizar la solicitud de inicio de sesión usando axios o fetch
					// Aquí se utiliza axios en el ejemplo
					const response = await axios.post("https://literate-space-succotash-v44q57gvx5wf7v-3001.app.github.dev/api/login", {
						email: dataEmail,
						password: dataPassword
					});
					const data = response.data;

					// Guardar el token en localStorage y en el estado global (store)
					localStorage.setItem("token", data.access_token);
					setStore({
						user: {
							email: dataEmail,
							token: data.access_token
						},
					});

					return true; // Retorna true para indicar inicio de sesión exitoso
				} catch (error) {
					console.error("Ha ocurrido un error durante el inicio de sesión", error);
					return false; // Retorna false para indicar inicio de sesión fallido
				}
			},

			// FUNCION PARA REGISTRO

			register: async (dataEmail, dataPassword) => {
				try {
					fetch("https://literate-space-succotash-v44q57gvx5wf7v-3001.app.github.dev/api/user", {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"email": dataEmail,
							"password": dataPassword
						})
					})
					.then((response)=>response.json())
				    .then((data)=>console.log(data))
					

					return true; // Retorna true para indicar inicio de sesión exitoso
				} catch (error) {
					console.error("Ha ocurrido un error durante el inicio de sesión", error);
					return false; // Retorna false para indicar inicio de sesión fallido
				}
			},


			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
