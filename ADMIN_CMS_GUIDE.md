# Admin CMS Guide
## Complete Website Content Management

This guide shows you how to manage ALL website content through the admin dashboard.

## Access the Admin Dashboard

1. **Navigate to** `/auth` or click "Admin Login" in the navigation
2. **Sign up** with your email and password
3. **You'll be redirected to** `/admin` after signup
4. **Grant yourself admin role** - Go to your backend and run:
   ```sql
   INSERT INTO user_roles (user_id, role) 
   VALUES ('your-user-id-here', 'admin');
   ```

---

## Content Types & Usage

### 1. **hero_content** - Hero Section

Manages the main hero section (first screen with auditor cards).

**Fields to use:**
- **Title**: Main heading (e.g., "On-Site Supplier Audits in Days, Not Weeks")
- **Slug**: `hero-main`
- **Content (body)**: Enter as JSON:
  ```json
  {
    "tagline": "2,000+ Auditors · 90+ Countries · AI-Powered",
    "subtitle": "70% Cost Reduction · 80% Time Savings · Global Coverage",
    "content": "Physical factory assessments (ISO, VDA, IATF) starting from €700.",
    "ctaText": "Experience a Connectimus Audit"
  }
  ```
- **Order Index**: `0`
- **Status**: `published`

---

### 2. **auditor_card** - Auditor Cards (Hero Section)

The rotating auditor cards in the hero section.

**Fields:**
- **Title**: Location name (e.g., "Europe", "Asia", "Africa")
- **Slug**: `auditor-europe`, `auditor-asia`, etc.
- **Content**: Region description (e.g., "Central Europe", "East Asia Pacific")
- **Featured Image**: Upload auditor photo
- **Order Index**: 0-5 (determines card order)
- **Status**: `published`

**Create 6 cards** with order_index 0-5 for all regions.

---

### 3. **feature_card** - How It Works Cards

The workflow cards in the "How It Works" section.

**Organization by Steps:**
- **Step 1** (Search Suppliers): order_index `0-9`
- **Step 2** (Select Auditor): order_index `10-19`
- **Step 3** (On-Site Audit): order_index `20-29`
- **Step 4** (Get Report): order_index `30-39`

**Example for Step 2:**
- **Title**: "Auditor Map"
- **Slug**: "step2-auditor-map"
- **Content**: "Interactive global coverage"
- **Featured Image**: Upload screenshot
- **Order Index**: `10` (first card of step 2)
- **Status**: `published`

**Create 16 cards total** (4 cards × 4 steps).

---

### 4. **full_screen_section** - Main Content Sections

Large full-screen sections (like the green section, AI section, etc.).

**Fields:**
- **Title**: Section title (e.g., "Global On-Demand Auditor Network")
- **Slug**: Unique identifier (e.g., "global-auditor-network")
- **Content (body)**: Enter as JSON:
  ```json
  {
    "number": "01",
    "content": "Access 2,000+ certified auditors across 90+ countries...",
    "gradient": "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74))"
  }
  ```
- **Order Index**: Determines section order (0, 1, 2, 3...)
- **Status**: `published`

---

### 5. **feature_photo** - Feature Photos

Photos for AI features, supplier search features, workflow features.

**Organization by Category:**
Use `order_index` to group:
- **AI Features**: 0-9
- **Supplier Features**: 10-19
- **Workflow Features**: 20-29

**Example:**
- **Title**: "AI Co-Pilot"
- **Slug**: "ai-copilot"
- **Content**: "Smart Analysis"
- **Featured Image**: Upload feature screenshot
- **Order Index**: `0` (first AI feature)
- **Status**: `published`

---

### 6. **page_section** - Generic Page Sections

Any other page sections or content blocks.

**Fields:**
- **Title**: Section heading
- **Slug**: Unique identifier
- **Content**: Main text content
- **Featured Image**: Optional background or feature image
- **Order Index**: Determines display order
- **Status**: `published`

---

### 7. **project** - Project/Portfolio Items

Individual project cards or portfolio items.

**Fields:**
- **Title**: Project name
- **Slug**: Project URL slug
- **Content (body)**: Enter as JSON:
  ```json
  {
    "number": "01",
    "content": "Project description text..."
  }
  ```
- **Featured Image**: Project image
- **Order Index**: Display order
- **Status**: `published`

---

### 8. **testimonial** - Customer Testimonials

Client testimonials and reviews.

**Fields:**
- **Title**: Client name
- **Slug**: `testimonial-client-name`
- **Content (body)**: Enter as JSON:
  ```json
  {
    "content": "Testimonial text...",
    "company": "Company Name",
    "position": "CEO"
  }
  ```
- **Featured Image**: Client photo
- **Order Index**: Display order
- **Status**: `published`

---

## Media Library Usage

### Uploading Images

1. Click **"Media Library"** tab in admin
2. Click **"Upload Image"** button
3. Select image file (max 10MB, JPG/PNG/WebP/GIF/SVG)
4. Image is automatically uploaded and available

### Best Practices

- **File naming**: Use descriptive names (e.g., `auditor-europe-portrait.jpg`)
- **Image sizes**: 
  - Auditor cards: 600x800px
  - Feature cards: 400x600px (3:4 aspect ratio)
  - Hero images: 1920x1080px
- **File formats**: PNG for graphics, JPG for photos
- **Optimization**: Compress images before upload for faster loading

---

## Workflow Example: Setting Up Hero Section

### Step 1: Upload Images
1. Go to Media Library
2. Upload 6 auditor photos (one for each region)

### Step 2: Create Hero Content
1. Content Type: `hero_content`
2. Title: "On-Site Supplier Audits in Days, Not Weeks"
3. Slug: `hero-main`
4. Content (as JSON):
   ```json
   {
     "tagline": "2,000+ Auditors · 90+ Countries · AI-Powered",
     "subtitle": "70% Cost Reduction · 80% Time Savings",
     "content": "Physical factory assessments starting from €700.",
     "ctaText": "Experience a Connectimus Audit"
   }
   ```
5. Status: `published`
6. Click **Create**

### Step 3: Create Auditor Cards
For each region (6 total):

1. Content Type: `auditor_card`
2. Title: Region name (Europe, Asia, etc.)
3. Slug: `auditor-europe` (unique for each)
4. Content: Region description
5. Featured Image: Select uploaded auditor photo
6. Order Index: 0, 1, 2, 3, 4, 5
7. Status: `published`
8. Click **Create**

### Step 4: View Changes
1. Go to homepage (`/`)
2. Hero section now displays your CMS content!

---

## Tips & Tricks

### JSON Content Format
When entering complex content, use this JSON structure in the Content field:
```json
{
  "content": "Main text here",
  "tagline": "Optional tagline",
  "subtitle": "Optional subtitle",
  "ctaText": "Button text",
  "number": "01",
  "gradient": "linear-gradient(...)",
  "company": "Company name",
  "position": "Job title"
}
```

### Order Index Strategy
- **0-9**: First group/step/category
- **10-19**: Second group/step/category
- **20-29**: Third group/step/category
- Use increments of 10 to make reordering easier

### Slug Naming Convention
- Use lowercase with hyphens
- Be descriptive: `hero-main`, `step2-auditor-map`, `testimonial-john-smith`
- Avoid special characters

### Status Management
- **draft**: Work in progress, not visible on site
- **published**: Live and visible to visitors
- **archived**: Hidden but preserved

---

## Troubleshooting

### Images Not Showing
- Check that status is `published`
- Verify image uploaded successfully in Media Library
- Confirm imageId is correctly saved in content

### Content Not Updating
- Ensure status is `published`, not `draft`
- Check browser cache (hard refresh: Ctrl+Shift+R)
- Verify content type matches section requirements

### Missing Permissions
- Contact admin to grant you `admin` or `editor` role
- Check user_roles table in backend

---

## Content Checklist

Use this checklist to set up the complete website:

- [ ] Upload all images to Media Library
- [ ] Create hero_content (1 item)
- [ ] Create auditor_card (6 items, order 0-5)
- [ ] Create feature_card (16 items, 4 per step)
- [ ] Create full_screen_section (4+ items)
- [ ] Create feature_photo (9+ items in 3 categories)
- [ ] Create project items (as needed)
- [ ] Create testimonials (as needed)
- [ ] Test all sections on live site
- [ ] Set all items to `published`

---

## Support

For technical issues or questions, refer to the main `BACKEND_ARCHITECTURE.md` document or contact your development team.