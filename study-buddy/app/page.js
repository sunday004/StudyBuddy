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
      filter: 'brightness(0.5)',
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
        <Typography variant="h2" component="h1" sx={{ color: 'rgba(0, 0, 0, 0.9)' }} gutterBottom >
          Welcome to StudyFlex
        </Typography>
        <Typography variant="h5" component="h2"sx={{ color: 'rgba(0, 0, 0, 0.9)' }} gutterBottom>
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
          style={{ width: '100%', height: 'auto' }} // Makes image responsive
        />
      </Box>
      {/* Text at the Bottom */}
      <Typography variant="h5" gutterBottom>
        Accessible Anywhere
      </Typography>
      <Typography>
      Study Flex flashcard users do not need to worry about being tied to a specific device or location. Our cloud-based system ensures that your flashcards are updated in real-time, and you can pick up right where you left off, whether you’re using a phone during your commute or your laptop at home.
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
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
      {/* Text at the Bottom */}
      <Typography variant="h5" gutterBottom>
        Smart Flashcards
      </Typography>
      <Typography>
      Our AI creates flashcards tailored to cover every specific topic in your coursework, ensuring comprehensive preparation. By analyzing your course materials, lecture notes, and syllabus, our AI identifies key concepts and generates personalized flashcards to target the most critical areas.
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
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>
      {/* Text at the Bottom */}
      <Typography variant="h5" gutterBottom>
      Multimedia Uploads
      </Typography>
      <Typography>
   Whether you prefer typing out notes, uploading documents, or even using voice recordings, our system effortlessly processes your content and converts it into effective flashcards. This flexibility allows you to focus on learning in the way that suits you best, without the hassle of manually creating study materials
      </Typography>
    </Box>
  </Box>
</Box>
    </Box>
  );
}
