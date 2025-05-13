import axios from "axios";
import {useEffect, useState} from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import './App.css';
import BookList from "./components/Books/BookList";
import About from './pages/About';
import AddBookForm from "./pages/AddBookForm";
import AxiosExample from "./pages/AxiosExample";
import Example from "./pages/Example";
import NotFound from "./pages/NotFound";
import Root from './pages/Root';
import Todos from "./pages/Todos";

const App = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3004/books").then((res) => {
      setBooksData(res.data).catch((err)=>console.error('Failed to fetch', err));
    });
  }, []);

  const addBookHandler = (newBook) => {
    setBooksData((prev) => [...prev, newBook]);
  };
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/books",
          element: (<BookList booksData={booksData} setBooksData={setBooksData}/>),
        },
        {
          path: "/add",
          element: <AddBookForm onAddBook={addBookHandler} />,
        },
        {
          path: "/example",
          element: <Example />,
        },
        {
          path: "axios",
          element: <AxiosExample />,
        },
        {
          path: "/todos",
          element: <Todos />,
        },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Root />}>
    //       <Route path="about" element={<About />} />
    //       <Route path="books" element={<BookList booksData={booksData} setBooksData={setBooksData} />} />
    //       <Route path="add" element={<AddBookForm onAddBook={addBookHandler} />} />
    //       <Route path="example" element={<Example />} />
    //       <Route path="todos" element={<Todos />} />
    //       <Route path="axiosexample" element={<AxiosExample />} />
    //       <Route path="*" element={<NotFound />} />
    //     </Route>      
    //   </Routes>
    // </BrowserRouter>
  // );
};

export default App;