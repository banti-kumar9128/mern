# MERN Deployment Guide

## Project URLs

- **Frontend (Vercel)**: https://mern-peach-psi.vercel.app
- **Backend (Render)**: https://mern-5i1k.onrender.com
- **Health Check**: https://mern-5i1k.onrender.com/health

## Prerequisites

- MongoDB Atlas account with cluster created
- Render account with backend service deployed
- Vercel account with frontend project
- Git repository configured

---

## STEP 1: Configure Render Backend Environment Variables

1. Go to: https://dashboard.render.com
2. Click your **mern-backend** service
3. Go to **Environment** tab
4. Add these environment variables:

```
MONGO_URI = mongodb+srv://banti:banti123@cluster0.uvgyhor.mongodb.net/banti?retryWrites=true&w=majority
JWT_SECRET = mern_jwt_secret_key_2025_production_secure
NODE_ENV = production
FRONTEND_URL = https://mern-peach-psi.vercel.app
ADMIN_EMAIL = admin@example.com
ADMIN_PASSWORD = admin123
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
```

5. **Save and Deploy**

---

## STEP 2: Configure MongoDB Atlas

1. Go to: https://cloud.mongodb.com
2. Click **Network Access**
3. Click **Add IP Address**
4. Add `0.0.0.0/0` (allows all IPs)
5. Click **Confirm**

This allows Render to connect to your MongoDB.

---

## STEP 3: Configure Vercel Frontend Environment Variables

1. Go to: https://vercel.com/dashboard
2. Click your project **mern-peach-psi**
3. Go to **Settings** → **Environment Variables**
4. Add this variable:

```
VITE_BASE_URL = https://mern-5i1k.onrender.com
```

5. **Save**

---

## STEP 4: Push Code to Git

Run these commands locally:

```bash
cd c:\Users\vk912\Desktop\mern

git add .
git commit -m "Complete MERN setup with production configs"
git push
```

---

## STEP 5: Deploy Backend on Render

1. Go to: https://dashboard.render.com
2. Click **mern-backend** service
3. Go to **Deployments** tab
4. Click **Redeploy** on the latest commit
5. Wait for ✅ **Deploy successful**

Check logs if there are errors:

- Click the deployment
- Click **Logs** tab

---

## STEP 6: Deploy Frontend on Vercel

1. Go to: https://vercel.com/dashboard
2. Click project **mern-peach-psi**
3. Go to **Deployments** tab
4. Click **Redeploy** on the latest commit
5. Wait for ✅ success

---

## STEP 7: Test Everything

### Test Backend Health:

```powershell
Invoke-WebRequest "https://mern-5i1k.onrender.com/health"
```

Should return: `{"status":"ok"}`

### Test Frontend:

1. Open: https://mern-peach-psi.vercel.app
2. You should see the homepage

### Test Admin Login:

1. Go to: https://mern-peach-psi.vercel.app/admin
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Should see Admin Dashboard

### Test API Calls:

1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh page
4. Check if API calls work (no errors)

---

## Troubleshooting

### Backend Not Responding

- Check Render logs: Dashboard → Deployments → Logs
- Verify MongoDB URI is correct
- Ensure all environment variables are set
- Check if MongoDB Atlas allows Render IP

### Frontend Not Connecting to Backend

- Open DevTools → Network tab
- Check API request URLs
- Verify `VITE_BASE_URL` is correct
- Check CORS errors in console

### CORS Errors

- Verify `FRONTEND_URL` is set correctly in backend .env
- Check if Render environment variables are deployed

### MongoDB Connection Failed

1. Check MongoDB Atlas credentials
2. Verify cluster name in URI
3. Add `0.0.0.0/0` to Network Access
4. Test URI locally first

---

## Local Testing Before Deployment

### Start Backend Locally:

```bash
cd backend
npm install
npm run dev
```

Should show: `✅ MongoDB connected successfully`

### Start Frontend Locally:

```bash
cd frontend/frontend
npm install
npm run dev
```

Should open: http://localhost:5173

Test API calls in the app.

---

## Important Notes

1. **Never commit real .env file** - It's in .gitignore
2. **Set all env vars on Render/Vercel dashboards**
3. **Keep JWT_SECRET secure** - Use a strong random string
4. **Update CLOUDINARY credentials** with real values
5. **Test health endpoint** after each deployment

---

## Admin Credentials

- Email: `admin@example.com`
- Password: `admin123`

---

Last Updated: February 14, 2026
