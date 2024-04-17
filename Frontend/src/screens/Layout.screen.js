import { Navbar, Nav, Container } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"

const LayoutScreen = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className='text-white' href="#home"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} className='text-white' to="/">Profile</Nav.Link>
                            <Nav.Link as={Link} className='text-white' to="/dashboard/computation">Computation</Nav.Link>
                            <Nav.Link as={Link} className='text-white' to="/dashboard/inventory">Inventory</Nav.Link>
                            <Nav.Link as={Link} className='text-white' to="/dashboard/food">3rd party API</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default LayoutScreen;
