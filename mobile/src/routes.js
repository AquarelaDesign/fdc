import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/Login'
import MainMenu from './pages/MainMenu'

const Routes = createAppContainer(
   createSwitchNavigator({
      Login,
      MainMenu,
   })
)

export default Routes