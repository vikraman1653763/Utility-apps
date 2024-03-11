<!DOCTYPE html>
<html>
<head>
	<title>PDF to Image Converter</title>
	<style>
		body {
			background-color: #f2f2f2;
			font-family: Arial, sans-serif;
		}
		h1 {
			text-align: center;
			margin-top: 50px;
			margin-bottom: 30px;
		}
		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 50px;
		}
		input[type="file"] {
			margin-bottom: 20px;
		}
		button {
			background-color: #4CAF50;
			color: white;
			padding: 10px 20px;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			margin-right: 10px;
		}
		button:hover {
			background-color: #3e8e41;
		}
		#image-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-top: 50px;
		}
		.image {
			margin: 10px;
			box-shadow: 0px 0px 10px #888888;
		}
	</style>
</head>
<body>
	<h1>PDF to Image Converter</h1>
	<form id="pdf-form">
		<input type="file" id="pdf-input" name="pdf" accept="application/pdf">
		<button type="button" onclick="convertToImages()">Convert to Images</button>
		<button type="button" onclick="saveImages()">Save Images</button>
	</form>
	<div id="image-container"></div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
	<script>
        let convertedImages = [];

        const pdfToImages = async (pdfData) => {
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const images = [];
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const viewport = page.getViewport({ scale: 1.0 });
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              await page.render({ canvasContext: ctx, viewport: viewport }).promise;
              const dataURL = canvas.toDataURL('image/png');
              images.push(dataURL);
            }
            return images;
          };
          
          const convertToImages = async () => {
            const pdfInput = document.getElementById('pdf-input');
            if (pdfInput.files.length === 0) {
              alert('Please select a PDF file.');
              return;
            }
            const pdfFile = pdfInput.files[0];
            const pdfData = await pdfFile.arrayBuffer();
            convertedImages = await pdfToImages(pdfData);
            const imageContainer = document.getElementById('image-container');
            imageContainer.innerHTML = '';
            convertedImages.forEach(imageData => {
              const imageElement = document.createElement('img');
              imageElement.classList.add('image');
              imageElement.src = imageData;
              imageContainer.appendChild(imageElement);
            });
          };
          
          const saveImages = () => {
            if (convertedImages.length === 0) {
              alert('No images to save.');
             
