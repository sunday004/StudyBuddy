"use client";

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
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>

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
          Welcome to Flashcard SaaS
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

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} position="relative" top="50px">
          {/* Feature items */}
          <Grid item>
            <Card padding={2}>
              <CardContent>
                <Typography variant="h5">Easy Input</Typography>
                <Typography>
                  Upload Class content via text to generate likely questions for
                  a quiz
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h5">Smart Flashcards</Typography>
                <Typography>
                  Upload Class content via text to generate likely questions for
                  a quiz
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="h5">Accessible Anywhere</Typography>
                <Typography>
                  Upload Class content via text to generate likely questions for
                  a quiz
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ my: 6, textAlign: "center" }}
        position="relative"
        bottom="10px"
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          position="relative"
          top="50px"
        >
          {/* Pricing plans */}
          <Grid item>
            <Card margin={2}>
              <CardContent>
                <Box height="300px" width="400px">
                  <Typography variant="h4">Free Version</Typography>

                  <Typography variant="h5">$0</Typography>
                  <Button variant="outlined" position="absolute" bottom="10px">
                    Start Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <Box height="300px" minWidth="400px">
                  <Typography variant="h4">Premium Offers</Typography>
                  <Typography variant="h5">$10</Typography>
                  <Button variant="outlined">Pay Now</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
