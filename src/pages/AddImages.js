import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineDelete, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

const ImageForm = () => {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const moveImageUp = (index) => {
    if (index === 0) return;
    const updatedImages = [...images];
    const imageToMove = updatedImages[index];
    updatedImages.splice(index, 1);
    updatedImages.splice(index - 1, 0, imageToMove);
    setImages(updatedImages);
  };

  const moveImageDown = (index) => {
    if (index === images.length - 1) return;
    const updatedImages = [...images];
    const imageToMove = updatedImages[index];
    updatedImages.splice(index, 1);
    updatedImages.splice(index + 1, 0, imageToMove);
    setImages(updatedImages);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  const handleSubmit = () => {
    // Handle the submission of images here
    console.log(images);
  };

  return (
    <div className="image-form">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop images here or click to browse</p>
      </div>
      <div className="image-preview">
        {images.map((file, index) => (
          <ImageItem
            key={index}
            index={index}
            file={file}
            removeImage={removeImage}
            moveImageUp={moveImageUp}
            moveImageDown={moveImageDown}
          />
        ))}
      </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleSubmit}>
          Submit Images
        </button>
      </div>
    </div>
  );
};

const ImageItem = ({ index, file, removeImage, moveImageUp, moveImageDown }) => {
  const [previewURL, setPreviewURL] = useState('');

  const reader = new FileReader();
  reader.onloadend = () => {
    setPreviewURL(reader.result);
  };
  reader.readAsDataURL(file);

  return (
    <div className="image-item">
      <div className="image-preview-container">
        <img src={previewURL} alt={`Image ${index + 1}`} className="image-preview-img" />

        <div className="image-buttons">
          <button onClick={() => removeImage(index)} className="image-button">
            <AiOutlineDelete />
          </button>
          <button onClick={() => moveImageUp(index)} className="image-button">
            <AiOutlineArrowUp />
          </button>
          <button onClick={() => moveImageDown(index)} className="image-button">
            <AiOutlineArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
