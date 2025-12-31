import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import { Header } from './components/Header/Header';
import { Calendar } from './components/Calendar/Calendar';
import { events2026 } from './data/events';
import { DancheongPattern } from './components/SVG/DancheongPattern';
import './styles/koreanTheme.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C97D60', // 파스텔톤 홍색 (태극)
      light: '#D4A574',
      dark: '#B8654A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6B8E9F', // 파스텔톤 청색 (태극)
      light: '#7A9BA8',
      dark: '#5A7A8A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F1E8', // 아이보리·미색 (한지 느낌)
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3A3A3A', // 옅은 먹색
      secondary: '#6B6B6B',
    },
    divider: '#E8E3D8', // 연회색
    error: {
      main: '#C97D60', // 홍색 계열
    },
    warning: {
      main: '#C9A961', // 금빛 베이지
    },
    info: {
      main: '#6B8E9F', // 청색 계열
    },
    success: {
      main: '#8B7D6B', // 옅은 먹색
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container 
        maxWidth="lg" 
        className="taegeuk-pattern"
        sx={{ 
          py: { xs: 3, sm: 6 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            opacity: 0.05,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <DancheongPattern width={200} height={200} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '150px',
            height: '150px',
            opacity: 0.05,
            pointerEvents: 'none',
            zIndex: 0,
            transform: 'rotate(180deg)',
          }}
        >
          <DancheongPattern width={150} height={150} />
        </Box>
        <Calendar year={2026} events={events2026} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
