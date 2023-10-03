import React, { useState } from "react";


export default function DocumentSheet({ children }: any) {
    return (
        <>
            <div className="w-4/5 h-4/5 bg-white w-90 shadow-lg m-auto">
                <div className="p-12">
                    {children}
                </div>
            </div>
        </>);
}