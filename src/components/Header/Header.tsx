import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { Taegeuk } from '../SVG/Taegeuk';

export const Header = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(232, 227, 216, 0.5)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(to right, transparent 0%, #C97D60 20%, #6B8E9F 50%, #C97D60 80%, transparent 100%)',
          opacity: 0.6,
        },
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
        <Box 
          sx={{ 
            mr: 2, 
            display: 'flex', 
            alignItems: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Taegeuk size={36} />
        </Box>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700, 
            color: '#3A3A3A',
            letterSpacing: '0.5px',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          행사 달력
        </Typography>
        <Button
          component="a"
          href="https://github.com/Seo-yul/techsummit/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHub />}
          sx={{
            color: '#3A3A3A',
            fontWeight: 500,
            fontSize: '0.875rem',
            textTransform: 'none',
            px: 2,
            py: 0.5,
            borderRadius: '20px',
            transition: 'all 0.3s ease',
            mr: 2,
            '&:hover': {
              color: '#C97D60',
              backgroundColor: 'rgba(201, 125, 96, 0.1)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          행사 제보
        </Button>
        <Box 
          sx={{ 
            display: { xs: 'none', sm: 'block' },
            px: 2,
            py: 0.5,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(201, 125, 96, 0.1) 0%, rgba(107, 142, 159, 0.1) 100%)',
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6B6B6B',
              fontWeight: 500,
            }}
          >
            Event in Korea
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

