/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './src/navigation/navigation';
import { ThemeContext } from './src/theme/theme-context';


function App(props) {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <ApplicationProvider {...eva} theme={eva[theme]}>
      <AppNavigator/>
    </ApplicationProvider>
    </ThemeContext.Provider>
  </React.Fragment>
    );
}

export default App;
