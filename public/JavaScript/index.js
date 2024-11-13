const dsaDiv = document.getElementById("dsa");

dsaDiv.addEventListener("click", () => {
  // Replace 'your_file.pdf' with the actual filename and path
  const fileUrl =
    "https://drive.google.com/file/d/1ad0qSM3z6uq3TqKu8kvUwmQN9HwVLp13/view?usp=drive_link";

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download =
    "https://drive.google.com/file/d/1ad0qSM3z6uq3TqKu8kvUwmQN9HwVLp13/view?usp=drive_link"; // Set the desired filename

  // Simulate a click on the link to trigger the download
  link.click();
});
