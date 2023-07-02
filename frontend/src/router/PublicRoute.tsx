
import { Navigate, Outlet } from 'react-router-dom'

interface PublicRoute{
  isAuthenticated: boolean
  // rest: any
}

const PublicRoute = ({isAuthenticated}: PublicRoute) => {

  
  if(!isAuthenticated){
    return <Outlet />
  }else {
    return <Navigate to="/"/>
  }
}

export default PublicRoute