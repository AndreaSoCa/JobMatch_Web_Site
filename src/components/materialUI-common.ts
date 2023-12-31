import { Box, styled} from '@mui/material';

export const Root = styled(Box)({
  minHeight: '100vh',
  minWidth: '100vw',
  backgroundImage: 'url("src/assets/Principal.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
});

export const Footer = styled('footer')({
  backgroundColor: 'whitesmoke',
  color: 'black',
  padding: 2,
  textAlign: 'center',
  marginTop: 4,
});