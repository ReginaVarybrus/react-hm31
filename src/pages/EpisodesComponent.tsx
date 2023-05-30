import * as React from 'react';
import { useState, useEffect } from "react";
import EpisodesEnhancedTable from "../components/EpisodesListTable";
import SkeletonTable from '../components/SkeletonTable';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { fetchEpisode, IFetchState, IPageInfo } from '../store/slices/episodeSlices';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { RootState, AppDispatch } from '../store/store';

const EpisodesComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(0);
    const rowsPerPage: number = 20;
    const offSet: number = page * rowsPerPage;

    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    const episodes = useAppSelector((state) => state.episodes.listOfEpisode);
    const info = useAppSelector((state) => state.episodes.pageInfo);
    const isLoading = useAppSelector((state) => state.episodes.isLoading);

    // const { episodes, info, isLoading } = useAppSelector(
    //     (state: { episodes: IFetchState }) => state.episodes
    //   );

    useEffect(() => {
        dispatch(fetchEpisode(`episode?page=${offSet / 20 + 1}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page])

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
        setPage(newPage);
    };

    if (isLoading && episodes.length === 0) {
        return <div>
            <Box sx={{ display: 'flex', position: 'absolute', left: '50%' }}>
                <CircularProgress />
            </Box>
        </div>
    }

    if (isLoading) {
        return <div className='Main-div'>
            <SkeletonTable rowsPerPage={rowsPerPage} />;
        </div>
    }

    return <div className="Main-div">
        <div>
            <EpisodesEnhancedTable
                data={episodes}
                count={info?.count as number}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage} />
        </div>
    </div>
}

export default EpisodesComponent;