import { createBrowserRouter } from 'react-router-dom'

import DashboardLayout from './layout/Dashboard'
import Credentials from './pages/Credentials'
import ConsentScreen from './pages/ConsentScreen'
import Analytics from './pages/Analytics'
import CreateCredentials from './pages/Credentials/CreateCredentials'
import ViewCredentials from './pages/ViewCredentials'
import SectionLayout from './layout/Section'
import ConfigureConsent from './pages/ConsentScreen/ConfigureConsent'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import ProtectedRoutes from './utils/ProtectedRoutes'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: '/credentials',
        element: <SectionLayout />,
        children: [
          {
            index: true,
            element: <Credentials />,
          },
          {
            path: 'client/:id',
            element: <ViewCredentials />,
          },
          {
            path: 'create',
            element: <CreateCredentials />,
          },
        ],
      },
      {
        path: '/consent',
        element: <SectionLayout />,
        children: [
          {
            index: true,
            element: <ConsentScreen />,
          },
          {
            path: ':id',
            element: <ConfigureConsent />,
          },
        ],
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

export default router
