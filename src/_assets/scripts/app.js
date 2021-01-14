document.addEventListener("DOMContentLoaded", function() {
    
    function scroller(input){
        // Get the list
        const list = document.getElementById(input);

        // Will execute autoScroll every 2 seconds
        let intervalId = window.setInterval(autoScroll, 2000);

        // Setup the autoScroll function
        function autoScroll() {
            // Get current scroll position
            let topPos = list.scrollTop;
            // Create the new scroll position
            const newPos = (topPos += 800);
            // Set the scroll position to the new one
            list.scrollTop = newPos;
        }

        // When mouse hovers on list
        list.onmouseover = function(){
            // Clear the interval top stop autoScroll
            clearInterval(intervalId);
            // Stop animation on scroll icon
            document.getElementsByClassName("bounce").classList.add(".animation--is-paused");
        };

        // When mouse leaves list
        list.onmouseleave = function(){
            // Re initiate autoScroll
            intervalId = window.setInterval(autoScroll, 2000);
            // Stop animation on scroll icon
            setTimeout(
                function() {
                    document.getElementsByClassName("bounce").classList.remove("no-bounce");
                },
            2000);
        };


        // Get the items
        const items = list.children;
        // Get the length
        const iterations = items.length;

        // Initial duplication of list
        for (let i = 0; i < 200; i++) {
            // Get the current element
            const e = items[i];
            // Clone the current element
            const clone = e.cloneNode(true);
            // Append the clone to the list
            list.appendChild(clone);
        }

        // When scrolling the list
        list.onscroll = function() {

            // Round the scrollTop of the list 
            const listTop = Math.ceil(list.scrollTop / 100) * 100;
            // Set the bottom
            const bottom = list.scrollHeight - list.offsetHeight;
            // Round the bottom
            const listBottom = Math.ceil(bottom / 100) * 100;

            if( listTop === listBottom ){
                // Get triple the list length
                const triple = items.length * 3;
                // Loop through the items
                for (let i = 0; i < triple; i++) {
                    // Get the current element
                    const e = items[i];
                    // Clone the current element
                    const clone = e.cloneNode(true);
                    // Append the clone to the list
                    list.appendChild(clone);
                    // Stop when reaching end of loop (prevents infinite loop)
                    if (i > iterations){
                        break;
                    }
                }
            }

        };

        const ele = list;
        ele.style.cursor = 'grab';

        let pos = { top: 0, left: 0, x: 0, y: 0 };

        const mouseDownHandler = function(e) {
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';

            pos = {
                left: ele.scrollLeft,
                top: ele.scrollTop,
                // Get the current mouse position
                x: e.clientX,
                y: e.clientY
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function(e) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            // Scroll the element
            ele.scrollTop = pos.top - dy;
            ele.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function() {
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Attach the handler
        ele.addEventListener('mousedown', mouseDownHandler);

    }

    scroller("heroList");
    scroller("skillsList");

});