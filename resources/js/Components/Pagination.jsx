import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center gap-1 mt-4">
            {links.map((link, key) => {
                if (!link.url) {
                    return (
                        <span
                            key={key}
                            className="px-4 py-2 text-gray-400 border rounded"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                const activeClasses = link.active
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';

                return (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 border rounded ${activeClasses}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}
