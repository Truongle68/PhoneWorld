import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const HomeNavbar = () => {
    const [openDropDown, setOpenDropDown] = useState('')
    const handleToggle = (isOpen, dropdownId) => {
        setOpenDropDown(isOpen ? dropdownId : '')
    }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container >
        {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">HOME</Nav.Link>
            <NavDropdown 
                title="TOP MANGA" 
                id="Dropdown1"
                show={openDropDown === 'Dropdown1'}    
                onMouseEnter={()=> handleToggle(true, 'Dropdown1')}
                onMouseLeave={()=> handleToggle(false, 'Dropdown1')}
                
            >
                <div style={{display:'grid', gridTemplateColumns:'auto auto'}}>
              <NavDropdown.Item href="#action4">
                By Week
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                By Month
              </NavDropdown.Item>
              <NavDropdown.Item href="#action6">
                By Season
              </NavDropdown.Item>
              <NavDropdown.Item href="#action7">
                By Year
              </NavDropdown.Item>
              </div>
            </NavDropdown>
            <NavDropdown 
                title="TYPE" 
                id="Dropdown2"
                show={openDropDown === 'Dropdown2'}    
                onMouseEnter={()=> handleToggle(true, 'Dropdown2')}
                onMouseLeave={()=> handleToggle(false, 'Dropdown2')}
            >
              <NavDropdown.Item href="#action3">TYPE</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <div className='search-box'>
                <input type='text' placeholder='Search: English, Japanese name'/>
                <i className="search-icon fa-solid fa-magnifying-glass"></i>
            </div>           
            
            
            <Button variant="outline-success">Login</Button>
          </Form>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;