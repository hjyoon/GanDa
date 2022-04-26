import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route index element={<FirstPage />} />
					<Route path='first' element={<FirstPage />} />
					<Route path='second' element={<SecondPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
