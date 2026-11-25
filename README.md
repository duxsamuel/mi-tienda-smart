```markdown
# MiTiendaSmart

SaaS web application for inventory management in small businesses, built with Next.js (static export) and a serverless backend on AWS Lambda + DynamoDB.

## Demo
- **Production:** `https://YOUR-DOMAIN.tech`
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
git clone [https://github.com/duxsamuel/mi-tienda-smart.git](https://github.com/duxsamuel/mi-tienda-smart.git)
cd mi-tienda-smart
npm install
npm run dev

```

Create a `.env.local` file in the root directory (ignored by Git) to connect to AWS:

```env
NEXT_PUBLIC_API_URL=[https://YOUR-FUNCTION-URL.lambda-url.us-east-1.on.aws/](https://YOUR-FUNCTION-URL.lambda-url.us-east-1.on.aws/)

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

## Team

Academic project developed at **Universidad de la Costa (CUC)**, 2026.

```

```
