import React, { useState, useEffect, useRef, useCallback } from 'react';
import unsplashApi from '../services/unsplashApi';
import LoadingIndicator from './LoadingIndicator';
import { Link } from 'react-router-dom';
import "../styles/photoList.css"

function PhotoList() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const observer = useRef(null);

    const fetchPhotos = useCallback(async () => {
        if (loading) return; // Prevent fetching if already loading
        setLoading(true);

        try {
            const newPhotos = await unsplashApi.getPhotos(page);
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]); // Append new photos
            setHasMore(newPhotos.length > 0); // Update hasMore based on newPhotos
            setPage(prevPage => prevPage + 1);


        } catch (error) {
            console.error("Error fetching photos:", error);
            setError(error);

        } finally {
            setLoading(false);
        }
    }, [loading, page]);

    const lastPhotoRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchPhotos();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, fetchPhotos]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    return (
        <div className="photo-list-container">
            {photos.map((photo, index) => (
                <Link  key={`${photo.id}-${page -1 }`} to={`/photos/${photo.id}`}>
                    <img
                        src={photo.urls.thumb}
                        alt={photo.alt_description}
                        ref={index === photos.length - 1 ? lastPhotoRef : null}
                    />
                    <p>{photo.user.name}</p>
                </Link>
            ))}

            {loading && <LoadingIndicator />}
            {error && <p>Error: {error.message}</p>}
            {!hasMore && !loading && <p>No more photos to load.</p>}
        </div>
    );
}

export default PhotoList;