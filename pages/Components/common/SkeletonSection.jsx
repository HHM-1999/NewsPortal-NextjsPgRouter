'use client';
import React from 'react';

export default function SkeletonSection() {
    return (
        <div className="container">
            <div className="skeleton-section">
                <div className="skeleton-grid">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton-img" />
                            <div className="skeleton-text short" />
                            <div className="skeleton-text" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
