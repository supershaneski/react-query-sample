import React from 'react';

const AppContext = React.createContext({
    scroll: 0,
    setScroll: () => {},
});

export default AppContext;