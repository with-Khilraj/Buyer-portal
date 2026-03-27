import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FAFAFA] text-slate-400">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="font-serif italic text-lg mt-4 animate-pulse">Entering the Estate Reserve...</p>
        </div>
    );
};

export default PageLoader;
