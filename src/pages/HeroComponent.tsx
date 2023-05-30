import * as React from "react";
import { useState, useEffect } from "react";
import EnhancedTable from "../components/HeroesListTable";
import SkeletonTable from "../components/SkeletonTable";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { fetchCharacter } from "../store/slices/heroSlices";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import type { RootState, AppDispatch } from "../store/store";

const HttpHeroComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(0);
  const rowsPerPage: number = 20;
  const offSet: number = page * rowsPerPage;

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const heroes = useAppSelector((state) => state.heroes.listOfChar);
  const info = useAppSelector((state) => state.heroes.pageInfo);
  const isLoading = useAppSelector((state) => state.heroes.isLoading);

  useEffect(() => {
    dispatch(fetchCharacter(`character?page=${offSet / 20 + 1}`));
  }, [dispatch, offSet, page]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  if (isLoading && heroes.length === 0) {
    return (
      <div>
        <Box sx={{ display: "flex", position: "absolute", left: "50%" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="Main-div">
        <SkeletonTable rowsPerPage={rowsPerPage} />;
      </div>
    );
  }

  return (
    <div className="Main-div">
      <div>
        <EnhancedTable
          data={heroes} // Передаем данные о героях
          count={info?.count || 0} // Передаем количество героев или 0, если информация недоступна
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          handleClickOpen={() => {}} // Передаем пустую функцию или вашу логику для handleClickOpen
          handleClose={() => {}} // Передаем пустую функцию или вашу логику для handleClosets
        />
      </div>
    </div>
  );
};

export default HttpHeroComponent;
