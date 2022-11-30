
import { Container, Nav } from "react-bootstrap";
import { useState } from "react";

//? Bootstrap and Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Link, Route, Routes } from "react-router-dom";

import SnowAnimationComponent from "./components/SnowAnimation/SnowAnimationComponent";
import MatrixAnimationComponent from "./components/MatrixAnimation/MatrixAnimationComponent";
import DrawImageRainComponent from "./components/DrawImageRain/DrawImageRainComponent";
import DrawImageComponent from "./components/DrawImage/DrawImageComponent";



function App() {

	const [location, setLocation] = useState('/');


	return (<div className="App bg-dark" style={{minHeight: '100vh'}}>

		<Container className="px-0 py-2" fluid={true}>

			<Nav variant="tabs bg-dark" defaultActiveKey="/" onSelect={(eventKey) => setLocation(eventKey)}>

				<Nav.Item>
					<Nav.Link className={location !== '/' ? 'text-light' : ''} as={Link} eventKey="/" to="/">Home</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link className={location !== '/Snow' ? 'text-light' : ''} as={Link} eventKey="/Snow" to="/Snow">Snow Animation</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link className={location !== '/Matrix' ? 'text-light' : ''} as={Link} eventKey="/Matrix" to="/Matrix">Matrix Animation</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link className={location !== '/DrawImageRain' ? 'text-light' : ''} as={Link} eventKey="/DrawImageRain" to="/DrawImageRain">Draw Image Rain</Nav.Link>
				</Nav.Item>

			</Nav>

		</Container>

		<Container fluid={true}>

			<Routes>

				<Route path="/" element={<DrawImageComponent></DrawImageComponent>} />

				<Route path="/Snow" element={<SnowAnimationComponent></SnowAnimationComponent>} />

				<Route path="/Matrix" element={<MatrixAnimationComponent></MatrixAnimationComponent>} />

				<Route path="/DrawImageRain" element={<DrawImageRainComponent></DrawImageRainComponent>} />

			</Routes>

		</Container>

	</div>);
}

export default App;
