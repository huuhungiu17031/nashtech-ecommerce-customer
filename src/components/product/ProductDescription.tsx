import { Box, Button, Typography } from '@mui/material';
import { BoxWrapper } from '../common';
import { renderHtmlDescription } from '@/utils';
const styles = {
  specsBox: {
    padding: 1.5,
  },
  descriptionContent: {
    padding: 2,
  },
  seeMoreButton: {
    position: 'absolute',
    bottom: -40,
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  descriptionBox: {
    position: 'relative',
  },
};
export const ProductDescription = ({
  description,
  handleOverFlow,
  overflow,
}: {
  description: string;
  handleOverFlow: () => void;
  overflow: boolean;
}) => {
  const { descriptionBox, specsBox, seeMoreButton } = styles;
  return (
    <Box sx={descriptionBox}>
      <BoxWrapper>
        <Box sx={specsBox}>
          <Typography component={'h2'} color={'danger'} textAlign={'center'}>
            ĐẶC ĐIỂM NỔI BẬT
          </Typography>
          <Box
            sx={{
              height: overflow ? 100 : '100%',
              overflow: overflow ? 'hidden' : 'unset',
            }}
            dangerouslySetInnerHTML={renderHtmlDescription(description)}
          />
        </Box>
      </BoxWrapper>
      <Button onClick={handleOverFlow} sx={seeMoreButton} color="primary">
        Xem Thêm
      </Button>
    </Box>
  );
};
