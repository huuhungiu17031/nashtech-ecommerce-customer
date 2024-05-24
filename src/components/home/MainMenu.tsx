import { CategoryInterface } from "@/shared";
import { BoxWrapper } from "../common";
import { DynamicLink } from "../partial";

const MainMenu = ({ categoryList }: any) => {
  // const { loading, category } = categoryState;
  // if (loading) return <div>Loading...</div>;

  return (
    <BoxWrapper sx={{ padding: "0" }}>
      {categoryList.map((item: CategoryInterface) => {
        return (
          <DynamicLink
            key={item.id}
            mainMenu
            children={item}
            to={`/category/${item.id}`}
            subIcon={"faChevronRight"}
          />
        );
      })}
    </BoxWrapper>
  );
};

export default MainMenu;
