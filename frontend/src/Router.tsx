import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Generation from './pages/Generation';
import Main from './pages/Main';
import Index from './pages/Index';
import Tuning from './pages/Tuning';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Index />}>
					<Route index element={<Main />} />
					<Route path='generate' element={<Generation />} />
					<Route path='tuning' element={<Tuning />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
