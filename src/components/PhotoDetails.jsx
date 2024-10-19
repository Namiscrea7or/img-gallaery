import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import unsplashApi from '../services/unsplashApi';
import LoadingIndicator from './LoadingIndicator';
import "../styles/photoDetails.css" // Import CSS for styling



function PhotoDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotoDetails = async () => {
            try {
                const photoData = await unsplashApi.getPhotoDetails(id);
                setPhoto(photoData);
            } catch (error) {
                console.error("Error fetching photo details:", error);
                setError(error);
                setTimeout(() => navigate('/'), 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotoDetails();
    }, [id, navigate]);

    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <div className="error-message"><p>Error: {error.message}</p></div>;
    }

    if (!photo) {
        return <p>Photo not found.</p>;
    }

    return (
        <div className="photo-details-container">
            <img src={photo.urls.regular} alt={photo.alt_description} className="detail-image" />
            <div className="photo-info">
                <h2 className="photo-title">{photo.description || "Untitled"}</h2>
                <p className="author-info">By: {photo.user.name}</p>
                <p className="photo-description">
                    {photo.alt_description || "No description available."}
                </p>
            </div>
        </div>
    );
}

export default PhotoDetails;