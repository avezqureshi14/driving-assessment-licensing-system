import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Video from "../components/Video";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const Home = () => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const reload = queryParams.get("reload");
  const navigate = useNavigate();

  const [id,setId] = useState('')

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setIsLoggedIn(!!profile); // !! converts the value to a boolean
    setId(profile?.result?._id)
  }, []);
  useEffect(() => {
    if (reload === "true") {
      // Remove the reload query parameter to avoid continuous reloads
      const newSearch = new URLSearchParams(search);
      newSearch.delete("reload");
      navigate({ search: newSearch.toString() });

      // Reload the page after necessary actions
      window.location.reload();
    }
  }, [reload, search, navigate]);

  return (
    <>
    <Navbar/>
    <div className="home">
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto', marginTop:"2rem", backgroundColor:"#eee" }}>
      <Typography variant="h6" gutterBottom>
        Get Driving License in 3 simple steps
      </Typography>
      <div className="cards">
        <NavLink to='/register' >
      <Card className="card" >
        <CardHeader
          title="Register on the site"
          avatar={<AccountCircleIcon />}
        />
        <CardContent>
          Do the registration with few easy steps
        </CardContent>
      </Card>
      </NavLink>
      <NavLink to='/rules' >
      <Card className="card" >
        <CardHeader
          title="Give the test"
          avatar={<AssignmentTurnedInIcon />}
        />
        <CardContent>
          Answer few questions
        </CardContent>
      </Card>
      </NavLink>
      {isLoggedIn ? (
<>
      <NavLink to={`/profile/${id}`} >
      <Card className="card" >
        <CardHeader
          title="Get the driving license"
          avatar={<AssignmentIndIcon />}
        />
        <CardContent>
        Flex your License in front of your friends
        </CardContent>
      </Card>
      </NavLink>
      </>
      ):(
        <>
        <NavLink to="/register" >
      <Card className="card" >
        <CardHeader
          title="Get the driving license"
          avatar={<AssignmentIndIcon />}
        />
        <CardContent>
          Flex your License in front of your friends
        </CardContent>
      </Card>
      </NavLink>
        </>
      )}
      </div>
    </Paper>
    </div>
    <div style={{height:"100vh"}}  >
    <Video/>
    </div>
    </>
  );
};

export default Home;
