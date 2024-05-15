import images from '@/assets/images';
import { Box, Grid } from '@mui/joy';
import { MainMenu } from '.';
import { useGetCategoryVms } from '@/services';
import { CircularLoading } from '..';
const listImages = [images.banner4, images.banner5, images.banner6];
const HomePage = () => {
  const { data, isLoading, isError, error } = useGetCategoryVms();
  if (isLoading) return <CircularLoading />;
  if (isError) throw error;
  return (
    <section>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={2}>
          <MainMenu categoryList={data} />
        </Grid>
        <Grid xs={7}>{/* <BoxGallery /> */}</Grid>
        <Grid xs={3}>
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
