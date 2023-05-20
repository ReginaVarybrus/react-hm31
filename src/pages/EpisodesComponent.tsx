import * as React from 'react';
import { useState, useEffect } from "react";
import EpisodesEnhancedTable from "../components/EpisodesListTable";
import SkeletonTable from '../components/SkeletonTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisode } from '../store/slices/rickAndMorty';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const EpisodesComponent = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rowsPerPage = 20;
    const offSet = page * rowsPerPage;

    const episodes = useSelector((state) => state.rickmorty.listOfEpisode)
    const isLoading = useSelector((state) => state.rickmorty.isLoading)

    useEffect(() => {
        dispatch(fetchEpisode(`episode?page=${offSet / 20 + 1}`));
    }, [dispatch, page])

    const handleChangePage = (event, newPage) => {
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
                count={episodes.info?.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage} />
        </div>
    </div>
}

export default EpisodesComponent;