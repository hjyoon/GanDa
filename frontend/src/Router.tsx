import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Generation from './pages/Generation';
import Main from './pages/Main';
import MainGumi from './pages/MainGumi';
import Index from './pages/Index';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Index />}>
					<Route index element={<Main />} />
					<Route path='main' element={<MainGumi />} />
					<Route path='generate' element={<Generation />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
