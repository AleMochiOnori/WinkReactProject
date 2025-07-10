import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainComponent from './MainComponent';
import DetailedBookComponent from './DetailedBookComponent';






function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainComponent />} />
                <Route path="/DetailedBookComponent/:id" element={<DetailedBookComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
