"use client";

import { useEffect } from "react";

export default function Client({
    fn,
    callback,
    run
}: {
    fn: (window: Window) => unknown // Changed void to any to allow returning data
    callback: (res: unknown) => void | null,
    run: boolean
}) {
    useEffect(() => {
        // Only execute if 'run' is true
        if (run) {
            const executeEffect = async () => {
                try {
                    // Execute the function. We wrap it in Promise.resolve 
                    // in case fn is not async but returns a value.
                    const result = await fn(window);
                    if (callback){
                        callback(result);
                    }
                } catch (error) {
                    console.error("Error executing client function:", error);
                    if (callback){
                        callback({ error: "Failed to execute function" });
                    }
                }
            };

            executeEffect();
        }
    }, [run, fn, callback]); // Re-run if any of these dependencies change

    // This is a logic-only component, so it returns nothing (null)
    return null;
}