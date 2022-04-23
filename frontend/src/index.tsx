import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<HashRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<FirstPage />} />
					<Route path="first" element={<FirstPage />} />
					<Route path="second" element={<SecondPage />} />
				</Route>
			</Routes>
		</HashRouter>
	</React.StrictMode>
);
