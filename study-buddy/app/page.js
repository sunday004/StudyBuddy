"use client";
import Image from 'next/image';

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Shadows,
} from "@mui/material";


export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Box
    sx={{
      backgroundImage: 'url("/background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: 'auto',
    }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            StudyFlex
          </Typography>
          
          <Button color="inherit" href="/flashcards">
              View Cards
          </Button>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to StudyFlex
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>
      <Typography position='relative' top='400px'align='center' variant="h4" component="h2" gutterBottom>
      Features
      </Typography>
      <Box sx={{ my: 6 }}>
  {/* Larger Flex Container */}
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between', // Equal space between items
      alignItems: 'flex-start',
      mt: 4,
      flexWrap: 'wrap', // Allows wrapping on smaller screens
      paddingTop: 45,
      paddingLeft:5,
      paddingRight:5,
    }}
  >
    {/* Feature Item 1 */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: {
          xs: '100%', // Full width on extra-small screens
          sm: '48%',  // Two items per row on small screens
          md: '30%',  // Three items per row on medium and up
        },
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        mb: 4, // Adds bottom margin to separate rows
      }}
    >
      {/* Image at the Top */}
      <Box sx={{ mb: 2 }}>
        <Image
          src="/accessible.jpg" // Replace with your image path
          alt="Easy Input"
          width={300}
          height={100}
          style={{ width: '100%', height: '100%' }} // Makes image responsive
        />
      </Box>
      {/* Text at the Bottom */}
      <Typography variant="h5" gutterBottom>
        Accessible Anywhere
      </Typography>
      <Typography>
      Access your flashcards on any device, anytime, anywhere.
      </Typography>
    </Box>

    {/* Feature Item 2 */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: {
          xs: '100%',
          sm: '48%',
          md: '30%',
        },
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        mb: 4,
      }}
    >
      {/* Image at the Top */}
      <Box sx={{ mb: 2 }}>
        <Image
          src="/Personalized.jpg" // Replace with your image path
          alt="Smart Flashcards"
          width={300}
          height={100}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      {/* Text at the Bottom */}
      <Typography variant="h5" gutterBottom>
        Smart Flashcards
      </Typography>
      <Typography>
        Our AI creates flashcards that adapt to your learning style.
      </Typography>
    </Box>

    {/* Feature Item 3 */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: {
          xs: '100%',
          sm: '48%',
          md: '30%',
        },
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        mb: 4,
      }}
    >
      {/* Image at the Top */}
      <Box sx={{ mb: 2 }}>
        <Image
          src="/Multimedia.jpg" // Replace with your image path
          alt="Accessible Anywhere"
          width={300}
          height={100}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      {/* Text at the Bottom */}
      <Typography variant="h5" gutterBottom>
      Multimedia Uploads
      </Typography>
      <Typography>
Our AI-powered flashcards are user-friendly and support a variety of inputs, from text to audio.
 Just upload your content, and get ready to dive into learning
      </Typography>
    </Box>
  </Box>
</Box>
    </Box>
  );
}
