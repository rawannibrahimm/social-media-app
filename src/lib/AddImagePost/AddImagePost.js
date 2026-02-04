// This function helps when a user clicks on the the image icon
// whether from the the create post card or the modal itself
// I will handle the modal to open itself after tyhe user chose an image from the icon of the post itself

//This function open the files when the user clicks on the image icon
// it takes the fileInput which holds the ref to the  input of type file
export function openFileInput(fileInput) {
    fileInput?.current?.click();
}

// This function helps when the user chooses an image the image is a file object now
// but what is it's URL? src??
// a way that helps us change it url
export function chooseFile(fileInput, setSelectedImage, setFormDataImg) {
    const file = fileInput.current.files[0];
    console.log(file);
    setSelectedImage(URL.createObjectURL(file));
    setFormDataImg(file);
}

// I will also choose these functions in the user profile to choose image
