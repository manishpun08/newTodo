import EditTodo from '../Component/EditTodo';
import Home from '../Component/Home';
import Login from '../Component/Login';
import Main from '../Component/Main';
import Register from '../Component/Register';
import MainLayout from '../Layout/MainLayout';

const mainRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'todo',
        element: <Home />,
      },

      {
        path: 'edit/:id',
        element: <EditTodo />,
      },

      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];

export default mainRoutes;
