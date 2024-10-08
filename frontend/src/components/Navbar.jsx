import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchList from './SearchList';
import { searchManga } from '../services/mangaServices';
import { useNavigate } from 'react-router-dom';
import { MangaState } from '../context/MangaContext';

const HomeNavbar = () => {
  const [openDropDown, setOpenDropDown] = useState('')
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [isShow, setIsShow] = useState(false)
  const { user, setUser } = MangaState()  
  const navigate = useNavigate()

  

  const handleToggle = (isOpen, dropdownId) => {
    setOpenDropDown(isOpen ? dropdownId : '')
  }

  const handleSearch = async (searchValue) => {
    if (!searchValue || searchValue.trim() === '') {
      setSearchResult([])
      console.log('Enter something to search')
      return
    }
    try {
      const { data } = await searchManga(searchValue)
      console.log(data)
      setSearchResult(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleInputChange = (e) => {
    const searchValue = e.target.value
    setSearch(searchValue);
    handleSearch(searchValue)
  }

  const handleLogout = () => {
    setIsShow(false)
    localStorage.removeItem('userInfo')
    setUser()
  }

  return (
    <Navbar expand="lg" className="nav-bar bg-body-tertiary">
      <div className='container' >
        {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">HOME</Nav.Link>
            <NavDropdown
              title="TOP MANGA"
              id="Dropdown1"
              show={openDropDown === 'Dropdown1'}
              onMouseEnter={() => handleToggle(true, 'Dropdown1')}
              onMouseLeave={() => handleToggle(false, 'Dropdown1')}

            >
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
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
              onMouseEnter={() => handleToggle(true, 'Dropdown2')}
              onMouseLeave={() => handleToggle(false, 'Dropdown2')}
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
          <Form className="d-flex" style={{ position: 'relative' }}>
            <div className='search-box'>
              <input
                type='text'
                placeholder='Search: English, Vietnamese name'
                value={search}
                onChange={handleInputChange}
              />
              <i
                className="search-icon fa-solid fa-magnifying-glass"
              ></i>
            </div>
            <SearchList
              searchResult={searchResult}
            />
            {user ?
              <div className='userInfo'>
                <img className='userPic' src={user.picture} />
                <i
                  onClick={() => setIsShow(!isShow)}
                  className={`fa-solid ${isShow ? 'fa-angle-up' : 'fa-angle-down'}`}>
                </i>

                <div className={`userInfo-dropdown ${isShow ? '' : 'hide'}`}>
                  <div className='dropdown-container'>
                    <p>Account information</p>
                    <p>History</p>
                    <p onClick={() => handleLogout()}>Logout</p>
                  </div>
                </div>

              </div>
              :
              <Button
                variant="outline-success"
                onClick={() => navigate('/login')}
              >Login</Button>
            }

          </Form>

        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default HomeNavbar;