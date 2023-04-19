import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Panel } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {BrowserRouter, HashRouter,Route,Routes} from 'react-router-dom'

import Home from './panels/Home';
import ItemName from './panels/Components/ItemName';
import { Context } from "./panels/Context.jsx";


const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [themeUser,setThemeUser] = useState('')
	

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			// setPopout(null);
			const theme = await bridge.send('VKWebAppUpdateConfig')
			const themeUser1 = theme.appearance
			setThemeUser(themeUser1)
		}
		fetchData();
		console.log(fetchedUser);
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const [context, setContext] = useState(true);

	return (
		
		// <ConfigProvider appearance={themeUser}>
		<ConfigProvider appearance='light'> 
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout >
						<SplitCol>
							<Context.Provider value={[context, setContext]}>
								<HashRouter>
									<Routes>
										<Route path='/' element={<Home fetchedUser={fetchedUser}/>} />
										<Route path='/:name' element={<ItemName />} />
									</Routes>
								</HashRouter>	
							</Context.Provider>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
