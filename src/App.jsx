
//? Bootstrap and Bootstrap icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SnowAnimationComponent from "./components/SnowAnimation/SnowAnimationComponent";
import MatrixAnimationComponent from "./components/MatrixAnimation/MatrixAnimationComponent";
import DrawImageRainComponent from "./components/DrawImageRain/DrawImageRainComponent";



function App() {

	return (<div className="App bg-dark p-2" style={{minHeight: '100vh'}}>

		{/* <SnowAnimationComponent></SnowAnimationComponent>

		<MatrixAnimationComponent></MatrixAnimationComponent>		 */}

		<DrawImageRainComponent></DrawImageRainComponent>

	</div>);
}

export default App;
