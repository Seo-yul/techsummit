import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Taegeuk } from '../SVG/Taegeuk';

export const Header = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        background: '#FFFFFF',
        borderBottom: '2px solid #E8E3D8',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(to right, transparent 0%, #C97D60 20%, #6B8E9F 50%, #C97D60 80%, transparent 100%)',
        },
      }}
    >
      <Toolbar>
        <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          <Taegeuk size={32} />
        </Box>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600, 
            color: '#3A3A3A',
            letterSpacing: '0.5px',
          }}
        >
          행사 달력
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6B6B6B',
            }}
          >
            Event in Korea
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

