import React, { useState, useEffect, useRef } from 'react';
import { picsumService } from '../../services/api/picsumService';

export default function QuizNo1Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [picsumImages, setPicsumImages] = useState([]);
    const countLoadImage = useRef(0);
    useEffect(() => {
        initState();
    }, []);

    async function initState() {
        try {
            const response = await picsumService.getImages();
            if (response) {
                setPicsumImages(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function checkImageLoad() {
        countLoadImage.current = countLoadImage.current + 1;
        if (picsumImages.length == countLoadImage.current) {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="loader-main" style={{display: isLoading ? '' : 'none' }}>
                <span className="loader">
                </span>
                <p className="text-light mt-2">กำลังโหลดรูปภาพ</p>
            </div>

            <div className="container-gallery">
                <div id="gallery">
                    {picsumImages.map(function (data) {
                        return (
                            <div key={data.id} className="item">
                                <img src={data.download_url} onLoad={() => checkImageLoad()} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}