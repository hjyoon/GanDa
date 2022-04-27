import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';
import Index from './pages/Index';
import Tuning from './pages/Tuning';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Index />}>
					<Route index element={<Upload />} />
					<Route path='tuning' element={<Tuning />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
