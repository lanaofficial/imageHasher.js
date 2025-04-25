// imageHasher.js - versi browser / Tampermonkey compatible

window.imageHasher = {
    getImageHash: function (canvas, size = 16) {
        const ctx = canvas.getContext('2d');
        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = size;
        resizedCanvas.height = size;
        const resizedCtx = resizedCanvas.getContext('2d');

        resizedCtx.drawImage(canvas, 0, 0, size, size);
        const imgData = resizedCtx.getImageData(0, 0, size, size).data;

        let grayscale = [];
        for (let i = 0; i < imgData.length; i += 4) {
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            grayscale.push(gray);
        }

        const median = grayscale.slice().sort((a, b) => a - b)[Math.floor(grayscale.length / 2)];
        const hash = grayscale.map(value => (value >= median ? 1 : 0)).join('');
        return hash;
    },

    rotateCanvas: function (sourceCanvas, direction = '180') {
        const rotatedCanvas = document.createElement('canvas');
        rotatedCanvas.width = sourceCanvas.width;
        rotatedCanvas.height = sourceCanvas.height;
        const ctx = rotatedCanvas.getContext('2d');

        if (direction === '180') {
            ctx.translate(rotatedCanvas.width, rotatedCanvas.height);
            ctx.rotate(Math.PI);
        }
        ctx.drawImage(sourceCanvas, 0, 0);
        return rotatedCanvas;
    },

    compareHashes: function (hash1, hash2) {
        let diff = 0;
        for (let i = 0; i < hash1.length; i++) {
            if (hash1[i] !== hash2[i]) diff++;
        }
        return diff;
    }
};
