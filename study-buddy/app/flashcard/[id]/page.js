'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {getDoc, setDoc, query, where,doc, collection, writeBatch,} from 'firebase/firestore';
import { db } from '/firebase';
//import { Container, Typography, CircularProgress } from '@mui/material';
import { useUser } from '@clerk/nextjs';

import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CircularProgress,
  } from '@mui/material'


export default function FlashcardDetails() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flipped, setFlipped] = useState([])
    const router = useRouter();
    //const { id } = router.query;  // Get the dynamic id from the route
    const id ="Theater"
    const [flashcardset, setFlashcardset] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
          ...prev,
          [id] : !prev[id],
        }))
      }

    useEffect(() => {
        if (id) {
            async function fetchFlashcard() {
                /* const docRef = doc(db, 'flashcardSets', id);  // Adjust path to your Firestore setup
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFlashcardset(docSnap.data());
                } else {
                    console.log('No such document!');
                }
                setLoading(false); */

                if (!user) return
                const item_id = id;
                const docRef = doc(collection(db, 'users'), user.id)

                //const docSnap = await getDoc(docRef)
    
                const cardRef = doc(collection(docRef, 'flashcardSets'), id)
                const cardSnap = await getDoc(cardRef)

                if (cardSnap.exists()) {
                    const flashcards1 = cardSnap.data().flashcards || []

                    setFlashcardset(flashcards1)
                } else {
                    await setDoc(docRef, { flashcards: [] })
                }
            }
            fetchFlashcard();
        }
    }, [id]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (!flashcardset) {
        return (
            <Container>
                <Typography variant="h5">Flashcard not found</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {flashcardset.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>

                      <CardActionArea onClick={() => {console.log(index) 
                      handleCardClick(index)}}>
                        <CardContent>
                            <Box sx={{ perspective: "1000px",
                              '& > div':{
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                position: 'relative',
                                width: '100%',
                                height: '200px',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                transform: flipped[index]
                                ? 'rotateY(180deg)'
                                : 'rotateY(0deg)',
                              },
                              '& > div > div':{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 2,
                                boxSizing: 'border-box',

                              },
                              '& > div > div:nth-of-type(2)':{
                                transform: 'rotateY(180deg)',
                              },
                              
                            }}>
                            <div>
                                <div>
                                <Typography variant="h5" component="div">
                                    {flashcard.front}
                                </Typography>
                                </div>
                                <div>
                                <Typography variant="h5" component="div">
                                    {flashcard.back}
                                </Typography>
                                </div>
                            </div>
                            </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    </Grid>
                ))}
                </Grid>
        </Container>
    );
}