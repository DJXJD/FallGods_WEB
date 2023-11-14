$(() => {
	console.log("This is something");
    function toggleDropdown() {
        var dropdownMenu = document.getElementById("dropdownMenu");
        var sidebarContainer = document.querySelector(".LeftSideBarContainer");

        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
            sidebarContainer.style.height = "100%"; // Restore the original height
        } else {
            dropdownMenu.style.display = "block";
            sidebarContainer.style.height = "auto"; // Expand to fit dropdown content
        }
    }
});
