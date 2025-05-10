// imageHasher.js
class ImageHasher {
    constructor() {
        this.size = 8; // 8x8 pixel grayscale = 64-bit hash
    }

    async hash(canvas) {
        const ctx = canvas.getContext('2d');
        const resized = document.createElement('canvas');
        resized.width = this.size;
        resized.height = this.size;
        const rctx = resized.getContext('2d');

        // Resize dan ubah jadi grayscale
        rctx.drawImage(canvas, 0, 0, this.size, this.size);
        const imgData = rctx.getImageData(0, 0, this.size, this.size).data;

        let total = 0;
        const gray = [];

        for (let i = 0; i < imgData.length; i += 4) {
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];
            const val = Math.round(0.299 * r + 0.587 * g + 0.114 * b); // grayscale
            gray.push(val);
            total += val;
        }

        const avg = total / gray.length;
        const bits = gray.map(v => (v > avg ? 1 : 0)).join('');
        return bits;
    }
}
