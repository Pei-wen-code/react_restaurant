import { useContext } from 'react';
import { AuthContext } from '../../context';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { setAuthToken } from '../../utils';

export default function NavBoostrap() {
    const { user, setUser } = useContext(AuthContext);

    const handleLogoutClick =() => {
        setAuthToken('');
        setUser(null);
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand to="/" as={Link}>Restaurant project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link to="/menu" as={Link}>Menu</Nav.Link>
                {user && <Nav.Link to="/reserve" as={Link}>Make reservation</Nav.Link>}
                {user && <Nav.Link to="/reserve/user" as={Link}>My reservation</Nav.Link>}
                {user === 'admin' && <Nav.Link to="/admin/menu" as={Link}>AdminMenu</Nav.Link>}
                {user === 'admin' && <Nav.Link to="/admin/reserve" as={Link}>AdminReserve</Nav.Link>}
                {!user && <Nav.Link to="/login" as={Link}>Login</Nav.Link>}
                {!user && <Nav.Link to="/register" as={Link}>Register</Nav.Link>}
                {user && <Nav.Link to="/" as={Link} onClick={handleLogoutClick}>Logout</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
