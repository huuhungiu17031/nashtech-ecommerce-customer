import images from '@/assets/images';
import { Box, Grid } from '@mui/material';
import { MainMenu } from '.';
import { useGetCategoryVms } from '@/services';
import { CarouselCustom, CircularLoading } from '..';
const listImages = [images.banner4, images.banner5, images.banner6];
const HomePage = () => {
  const { data, isLoading, isError, error } = useGetCategoryVms();
  if (isLoading) return <CircularLoading />;
  if (isError) throw error;
  return (
    <section>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={2}>
          <MainMenu categoryList={data} />
        </Grid>
        <Grid item xs={7}>
          <CarouselCustom>
            {listImages.map((item, index) => {
              return (
                <Box key={index}>
                  <img src={item} />
                </Box>
              );
            })}
          </CarouselCustom>
        </Grid>
        <Grid item xs={3}>
          {listImages.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  img: {
                    width: '100%',
                  },
                }}>
                <img src={item} alt="" />
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </section>
  );
};

export default HomePage;
