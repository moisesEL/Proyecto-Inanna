import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/Logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const { login, switchLogin } = useGlobalReducer();
	const isToken = localStorage.getItem("jwt-token") ? true : false
	const navigate = useNavigate();


	const handleLogout = () => {
		localStorage.clear()
		switchLogin();
		navigate("/");

	};

	return (
		<nav className="navbar navbar-expand-lg text-light color-text-light">
			<div className="container-fluid text-light container">

				<Link to="/" className="navbar-brand mx-2 mx-md-5">
					<img className="logo" src={Logo} alt="Logo Inanna" />
				</Link>

				<button
					className="navbar-toggler ms-auto me-2"
					type="button"
					onClick={() => setIsNavCollapsed(!isNavCollapsed)}
					aria-expanded={!isNavCollapsed}
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
				</button>

				<div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">

					<ul className="navbar-nav me-auto d-flex flex-column flex-lg-row align-items-center text-center w-100">
						{/* <li className="nav-item mx-3">
							<Link to="/refuges" className="nav-link text-light">
								<b>Refugios</b>
							</Link>
						</li> */}
						<li className="nav-item my-2 my-lg-0 mx-lg-3">
							<Link to="/lostanimals" className="nav-link text-light" onClick={() => setIsNavCollapsed(true)}>
								<b>Animales Perdidos</b>
							</Link>
						</li>
						<li className="nav-item my-2 my-lg-0 mx-lg-3">
							<Link to="/foundanimals" className="nav-link text-light" onClick={() => setIsNavCollapsed(true)}>
								<b>Animales Encontrados</b>
							</Link>
						</li>

						{isToken ? (
							<li className="nav-item my-2 my-lg-0 mx-lg-3">
								<Link to="/auth/registerpets" className="nav-link text-light" onClick={() => setIsNavCollapsed(true)}>
									<b>Añadir Registro</b>
								</Link>
							</li>) : null}
					</ul>

					<div className="d-flex justify-content-center my-3 my-lg-0">
						<Link to="/filteredsearch" onClick={() => setIsNavCollapsed(true)}>
							<button className="btn btn-outline-success mx-1" type="submit">
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</Link>
					</div>

					{isToken ? (

						//     VISTA SI ESTÁ LOGUEADO
						<div className="nav-item mx-lg-3 d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
							<Link to="/ProfilePage" className="nav-link mb-3 mb-lg-0 me-lg-3 w-100 text-center" onClick={() => setIsNavCollapsed(true)}>
								<i className="fa-regular fa-user me-1"></i>Mi Perfil
							</Link>

							<button
								className="btn btn-danger w-100 w-lg-auto"
								onClick={() => {
									handleLogout();
									setIsNavCollapsed(true);
								}}
							>
								Cerrar Sesión
							</button>
						</div>
					) : (
						//   VISTA SI NO ESTÁ LOGUEADO
						<div className="nav-item mx-lg-3 d-flex flex-column flex-lg-row align-items-center mt-3 mt-lg-0">
							<Link to="/signup-page" className="nav-link mb-3 mb-lg-0 me-lg-3 text-center" onClick={() => setIsNavCollapsed(true)}>
								<i className="fa-solid fa-pen-to-square me-1"></i>Registro
							</Link>
							<Link to="/loginpage" className="nav-link text-center" onClick={() => setIsNavCollapsed(true)}>
								<i className="fa-regular fa-user me-1"></i>Iniciar Sesión
							</Link>
						</div>
					)}

				</div>
			</div>
		</nav>
	);
};
