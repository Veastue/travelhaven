'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import Heading from './Heading';
import Buttons from './Buttons';

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No exact matches',
    subtitle = 'try changing or removing some of filters',
    showReset
}) => {

    const router = useRouter();
    
    return (
            <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
                <Heading
                    center
                    title={title}
                    subtitle={subtitle}
                />
                <div className="w-48 mt-4">
                    {showReset && (
                        <Buttons
                            outline
                            label = 'remove all filters'
                            onClick={()=> router.push('/')}
                        />
                    )}
                </div>
            </div>
    )
}

export default EmptyState