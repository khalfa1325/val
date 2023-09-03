
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { useDispatch, useSelector } from "react-redux";
import { create, errorR, loginRagazo, loginUser } from "../../featchers/UserOspita/userSlice";
import axios from "axios";



export default () => {

 





  const [viewport, setViewport] = useState('');

  const [error, setError] = useState(null);

  useEffect(() => {
   
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          setViewport({
            ...viewport,
            latitude,
            longitude,
          });
        },
        error => {
          console.error("Error getting location:", error);
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  console.log(viewport)
 


 
  // navigator.geolocation.getCurrentPosition((post) => { console.log(post) })
  // const index = async () => {

  //   const res = await fetch('https://api.ipify.org?format=json')
  //   console.log(res)
  //   const data = await res.json()
  //   console.log(data)
  // }
  // index()
  const dispatch = useDispatch()
  const [data, setData] = useState('')
  const user = useSelector(create)
  console.log(user)

  const errorRA=useSelector(errorR)
  console.log(errorRA)



  const HandelOnchange = (e) => {
    e.preventDefault()
    setData({
      ...data,
      [e.target.name]: e.target.value
    })

  }
  console.log(data)
  const handelLogin = (e) => {
    e.preventDefault()
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    console.log(isEmail)
    if (!isEmail) {
      dispatch(loginRagazo({data,viewport}))
    } else {

      dispatch(loginUser({data,viewport}))
    }

  }
  return (
    <main>
      <p>Current Latitude: {viewport.latitude}</p>
      <p>Current longitude: {viewport.longitude}</p>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our OSPITA o RAGAZZO</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email||text" onChange={HandelOnchange} name='email' placeholder="example@company.com o codeFiscale" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" name='password' onChange={HandelOnchange} />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      {/* <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" onChange={HandelOnchange} />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check> */}
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" onClick={handelLogin}>
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={user?.Role?.includes('user') === true ? Routes.Signup.path : Routes.registerPersonne.path} className="fw-bold">
                      {
                        ` Create account `
                      }
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
