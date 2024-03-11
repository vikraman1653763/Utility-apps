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
  const images = await pdfToImages(pdfData);
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';
  images.forEach(imageData => {
    const imageElement = document.createElement('img');
    imageElement.classList.add('image');
    imageElement.src = imageData;
    imageContainer.appendChild(imageElement);
  });
};
