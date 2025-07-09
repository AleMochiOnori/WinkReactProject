import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainComponent from './MainComponent';






function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
