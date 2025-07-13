# 📸 Images Directory Structure

Place your images in the following folders based on their usage:

## 📁 Folder Organization

### `/hero/`
Place your main hero/banner images here:
- `hero-image.png` - Main homepage hero image
- `database-hero.png` - Database page hero image (if different)

### `/steps/`
Place your "How It Works" step images here:
- `step-1.png` - "Bedürfnisse klären" image  
- `step-2.png` - "Angebote finden" image
- `step-3.png` - "Vernetzen und Teilen" image

### `/decorations/`
Place decorative elements here:
- `plant-decoration.png` - Footer plant decoration
- `flower-icon.png` - Search bar flower icon
- Any other decorative elements

### `/logos/`
Place logo variations here:
- `moodbase-logo.png` - Main logo
- `moodbase-logo-white.png` - White version for dark backgrounds
- `favicon.ico` - Favicon

## 🔗 How to Reference Images

After placing images, update the component references:

### In JSON files:
```json
"heroImage": "/images/hero/hero-image.png"
"plantDecoration": "/images/decorations/plant-decoration.png"
```

### In component files:
```jsx
<img src="/images/steps/step-1.png" alt="Step 1" />
```

## 📝 Your PNG Images

Perfect! PNG format is great for:
- **High quality**: Supports transparency and lossless compression
- **Graphics/Icons**: Excellent for logos and decorative elements
- **Hero images**: Good quality for main visuals

Your PNG files will work perfectly in all the designated folders!

## 🎯 Image Optimization Tips

- Use responsive images when possible
- Compress images before uploading
- Consider using `.webp` format for better performance
- SVGs are preferred for logos and icons (scalable + small file size)

Once you've added your images, I can help you update the component references!