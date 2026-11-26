
# MiTiendaSmart

SaaS web application for inventory management in small businesses, built with Next.js (static export) and a serverless backend on AWS Lambda + DynamoDB.

## Demo
- **Production:** `https://bpds-mitiendasmart.tech`
- **GitHub Pages:** `https://duxsamuel.github.io/mi-tienda-smart/`

## Features
- Full product CRUD (create, list, update, and delete).
- Automatic inventory metrics (total products, total units, and total inventory value).
- Fallback mode using mock data when `NEXT_PUBLIC_API_URL` is not set.

## Tech Stack
- **Frontend:** Next.js 16 (App Router) + TypeScript + global CSS (`app/globals.css`).
- **Backend:** AWS Lambda (Node.js 20+) with Function URL and CORS enabled.
- **Database:** Amazon DynamoDB (`Productos` table, `id` partition key).
- **Deployment:** GitHub Actions + GitHub Pages + `.tech` domain.

## Local Setup & Execution
```bash
git clone https://github.com/duxsamuel/mi-tienda-smart.git
cd mi-tienda-smart
npm install
npm run dev

```

Create a `.env.local` file in the root directory (ignored by Git) to connect to AWS:

```env
NEXT_PUBLIC_API_URL=https://YOUR-FUNCTION-URL.lambda-url.us-east-1.on.aws/

```

## API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Retrieves the list of products |
| `POST` | `/` | Creates a new product (`{nombre, precio, cantidad}`) |
| `PUT` | `/?id=ID` | Updates an existing product |
| `DELETE` | `/?id=ID` | Deletes a product by `id` |

## Git Workflow & Deployment

* Feature branches (`feature/backend`, `feature/formulario`, `feature/tabla`, `feature/crud`, `feature/deploy`) → PR to `prod` → final PR to `main`.
* When merged into `main`, `.github/workflows/deploy.yml` builds the static site (`out/`) and deploys it to GitHub Pages.
## Project Structure
```
mi-tienda-smart/
├── .github/workflows/deploy.yml   # CI/CD: build and publish to GitHub Pages
├── app/
│   ├── layout.tsx                 # Root layout (imports globals.css)
│   ├── page.tsx                   # Landing page (/)
│   ├── login/page.tsx             # Login (/login)
│   ├── dashboard/page.tsx         # Inventory dashboard (/dashboard)
│   ├── components/                # FormularioProducto, TablaProductos, Indicadores
│   ├── services/api.ts            # Calls to the Function URL (or mock data)
│   ├── types/producto.ts          # Producto type
│   └── globals.css                # Global styles (white and blue)
├── backend/                       # Lambda code and test events
├── public/                        # Static assets
└── next.config.ts                 # Static export (output: "export")
```

## Application Flow
Landing (`/`) → Login (`/login`) → Dashboard (`/dashboard`).

The dashboard calls `api.ts`, which sends requests to the AWS Lambda Function URL. Lambda reads and writes the `Productos` table in DynamoDB.

## Build & Deploy
- **Build:** `npm run build` generates the static site in the `out/` folder.
- **Deploy:** every merge to `main` runs `.github/workflows/deploy.yml`, which publishes `out/` to GitHub Pages.
- **Required variable:** `NEXT_PUBLIC_API_URL` (Settings → Secrets and variables → Actions → Variables).

## CI/CD: `deploy.yml`
- **Trigger:** `push` to `main`, or manual run (`workflow_dispatch`).
- **Permissions:** read the code and publish to Pages.
- **Job `build`:** checks out the code, installs Node 22, runs `npm ci` and `npm run build` (with the Lambda URL), and uploads `out/` as an artifact.
- **Job `deploy`:** depends on `build` (`needs`) and publishes the artifact to GitHub Pages.

## React & Configuration
- **Main component:** `app/layout.tsx` wraps every page; `app/page.tsx` is the landing page.
- **Routing:** each folder with a `page.tsx` inside `app/` is a route.
- **Static files:** `public/` (source) and `out/` (build output).
- **Styles:** `app/globals.css`.
- **`next.config.ts`:** `output: "export"` generates plain HTML; `images.unoptimized` allows images without a server.

## Custom Domain (DNS)
Domain: `bpds-mitiendasmart.tech`

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `duxsamuel.github.io` |

Then set the domain in Settings → Pages → Custom domain and enable Enforce HTTPS.

## Resources
- [Next.js documentation](https://nextjs.org/docs)
- [GitHub Pages](https://docs.github.com/pages)
- [GitHub Actions](https://docs.github.com/actions)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/)
- [Amazon DynamoDB](https://docs.aws.amazon.com/dynamodb/)
## Team

Academic project developed at **Universidad de la Costa (CUC)**, 2026.

```
By Samuel Duque, Edwin Cera, Nicolás Corro and Breitner Suárez.
```
