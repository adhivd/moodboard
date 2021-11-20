import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */

// RENAME THIS EVENTUALLY + REFACTOR LOL


function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log("You clicked outside of me!", event);
                if(event.target.nodeName == "HTML" || event.target.parentNode.className == "dropZone") {
                    callback(); // removeAllFocus() --> Canvas.js
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.removeAllFocus);

    return <div ref={wrapperRef} uuidkey={props.uuidkey} >{props.children}</div>;
}